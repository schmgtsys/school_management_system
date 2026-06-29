<template>
  <div class="container-fluid px-0">
    <PageHeader 
      title="Students Directory" 
      description="Manage student enrollment profiles, primary contacts, and statuses."
    >
      <template #actions>
        <div class="d-flex gap-2">
          <SearchBar v-model="searchQuery" placeholder="Search by name, ID..." />
          <Button variant="primary" icon="bi-person-plus-fill" @click="showAddModal = true">
            Add Student
          </Button>
        </div>
      </template>
    </PageHeader>

    <div class="row">
      <div class="col-12">
        <Card>
          <DataTable 
            :columns="columns" 
            :items="filteredStudents" 
            :loading="loading"
            :selectable="true"
            v-model:selectedIds="selectedIds"
          >
            <!-- Custom Slot for Student Name and Avatar -->
            <template #col-name="{ item }">
              <div class="d-flex align-items-center gap-2">
                <Avatar :name="item.name" size="32" variant="primary" />
                <div>
                  <span class="fw-semibold d-block text-dark">{{ item.name }}</span>
                  <span class="text-muted small" style="font-size: 0.75rem;">{{ item.email }}</span>
                </div>
              </div>
            </template>

            <!-- Custom Slot for Status -->
            <template #col-status="{ item }">
              <Badge :variant="item.status === 'Active' ? 'success' : 'warning'">{{ item.status }}</Badge>
            </template>

            <!-- Action column slot -->
            <template #actions="{ item }">
              <button class="btn btn-sm btn-light border me-1" @click="viewStudentDetails(item)">
                <i class="bi-eye-fill text-info"></i>
              </button>
              <button class="btn btn-sm btn-light border me-1" @click="editStudent(item)">
                <i class="bi-pencil-fill text-primary"></i>
              </button>
              <button class="btn btn-sm btn-light border" @click="deleteStudent(item)">
                <i class="bi-trash-fill text-danger"></i>
              </button>
            </template>
          </DataTable>
          
          <Pagination 
            :currentPage="currentPage" 
            :pageSize="5" 
            :totalItems="10" 
            @page-changed="changePage" 
          />
        </Card>
      </div>
    </div>

    <!-- Add/Edit Student Mock Modal -->
    <Modal v-model="showAddModal" :title="editingStudent ? 'Edit Student Details' : 'Register New Student'" @close="closeModal">
      <div class="mb-3">
        <label class="form-label fw-semibold text-dark small">Student Full Name</label>
        <input type="text" class="form-control form-control-sm" v-model="studentForm.name" placeholder="Enter student name" />
      </div>
      <div class="mb-3">
        <label class="form-label fw-semibold text-dark small">Email Address</label>
        <input type="email" class="form-control form-control-sm" v-model="studentForm.email" placeholder="student@email.com" />
      </div>
      <div class="row g-2 mb-3">
        <div class="col">
          <label class="form-label fw-semibold text-dark small">Class Room</label>
          <select class="form-select form-select-sm" v-model="studentForm.class">
            <option>Grade 9-A</option>
            <option>Grade 10-A</option>
            <option>Grade 11-A</option>
          </select>
        </div>
        <div class="col">
          <label class="form-label fw-semibold text-dark small">Status</label>
          <select class="form-select form-select-sm" v-model="studentForm.status">
            <option>Active</option>
            <option>Pending</option>
          </select>
        </div>
      </div>
      <template #footer>
        <Button variant="secondary" size="sm" @click="closeModal">Close</Button>
        <Button variant="primary" size="sm" @click="saveStudent">Save Student</Button>
      </template>
    </Modal>

    <!-- View Student Details Modal -->
    <Modal v-model="showViewModal" title="Student Profile Details" @close="showViewModal = false">
      <div v-if="selectedStudent" class="text-dark">
        <div class="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
          <Avatar :name="selectedStudent.name" size="64" variant="primary" />
          <div>
            <h5 class="fw-bold mb-1">{{ selectedStudent.name }}</h5>
            <span class="badge bg-success-subtle text-success border border-success">{{ selectedStudent.status }}</span>
          </div>
        </div>
        <div class="row g-3">
          <div class="col-6">
            <span class="text-secondary small fw-medium d-block">Student ID</span>
            <span class="fw-semibold font-monospace">{{ selectedStudent.studentId }}</span>
          </div>
          <div class="col-6">
            <span class="text-secondary small fw-medium d-block">Email Address</span>
            <span class="fw-semibold">{{ selectedStudent.email }}</span>
          </div>
          <div class="col-6">
            <span class="text-secondary small fw-medium d-block">Classroom Group</span>
            <span class="fw-semibold">{{ selectedStudent.class }}</span>
          </div>
          <div class="col-6">
            <span class="text-secondary small fw-medium d-block">Parent/Guardian</span>
            <span class="fw-semibold">{{ selectedStudent.parentName }}</span>
          </div>
        </div>
      </div>
      <template #footer>
        <Button variant="secondary" size="sm" @click="showViewModal = false">Close Profile</Button>
      </template>
    </Modal>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import Card from '../components/Card.vue';
import DataTable from '../components/DataTable.vue';
import Avatar from '../components/Avatar.vue';
import Badge from '../components/Badge.vue';
import Pagination from '../components/Pagination.vue';
import SearchBar from '../components/SearchBar.vue';
import Modal from '../components/Modal.vue';
import Button from '../components/Button.vue';

export default {
  name: 'Students',
  components: { PageHeader, Card, DataTable, Avatar, Badge, Pagination, SearchBar, Modal, Button },
  setup() {
    const loading = ref(false);
    const searchQuery = ref('');
    const showAddModal = ref(false);
    const editingStudent = ref(false);
    const selectedIds = ref([]);
    const currentPage = ref(1);

    const showViewModal = ref(false);
    const selectedStudent = ref(null);

    const studentForm = ref({ name: '', email: '', class: 'Grade 10-A', status: 'Active' });

    const columns = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'studentId', label: 'Student ID' },
      { key: 'class', label: 'Class' },
      { key: 'parentName', label: 'Parent/Guardian' },
      { key: 'status', label: 'Status' }
    ];

    const students = ref([
      { id: 1, name: 'Liam Sterling', email: 'liam.sterling@sms.edu', studentId: 'STU-2026-0041', class: 'Grade 10-A', parentName: 'Robert Sterling', status: 'Active' },
      { id: 2, name: 'Chloe Vance', email: 'chloe.vance@sms.edu', studentId: 'STU-2026-0042', class: 'Grade 9-B', parentName: 'Emily Vance', status: 'Active' },
      { id: 3, name: 'Ethan Hunt', email: 'ethan.hunt@sms.edu', studentId: 'STU-2026-0043', class: 'Grade 11-A', parentName: 'Owen Hunt', status: 'Pending' },
      { id: 4, name: 'Mia Wong', email: 'mia.wong@sms.edu', studentId: 'STU-2026-0044', class: 'Grade 12-C', parentName: 'Kevin Wong', status: 'Active' },
      { id: 5, name: 'Lucas Scott', email: 'lucas.scott@sms.edu', studentId: 'STU-2026-0045', class: 'Grade 10-A', parentName: 'Dan Scott', status: 'Active' }
    ]);

    const filteredStudents = computed(() => {
      if (!searchQuery.value) return students.value;
      const q = searchQuery.value.toLowerCase();
      return students.value.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.studentId.toLowerCase().includes(q) ||
        s.class.toLowerCase().includes(q)
      );
    });

    const editStudent = (student) => {
      editingStudent.value = true;
      studentForm.value = { ...student };
      showAddModal.value = true;
    };

    const deleteStudent = (student) => {
      if (confirm(`Are you sure you want to delete ${student.name}?`)) {
        students.value = students.value.filter(s => s.id !== student.id);
      }
    };

    const saveStudent = () => {
      if (editingStudent.value) {
        const index = students.value.findIndex(s => s.id === studentForm.value.id);
        if (index > -1) {
          students.value[index] = { ...studentForm.value };
        }
      } else {
        students.value.push({
          id: Date.now(),
          name: studentForm.value.name,
          email: studentForm.value.email,
          studentId: `STU-2026-00${Math.floor(Math.random() * 90) + 10}`,
          class: studentForm.value.class,
          parentName: 'N/A',
          status: studentForm.value.status
        });
      }
      closeModal();
    };

    const closeModal = () => {
      showAddModal.value = false;
      editingStudent.value = false;
      studentForm.value = { name: '', email: '', class: 'Grade 10-A', status: 'Active' };
    };

    const changePage = (page) => {
      currentPage.value = page;
    };

    const viewStudentDetails = (student) => {
      selectedStudent.value = student;
      showViewModal.value = true;
    };

    return {
      loading,
      searchQuery,
      showAddModal,
      editingStudent,
      selectedIds,
      currentPage,
      studentForm,
      columns,
      filteredStudents,
      editStudent,
      deleteStudent,
      saveStudent,
      closeModal,
      changePage,
      showViewModal,
      selectedStudent,
      viewStudentDetails
    };
  }
}
</script>
