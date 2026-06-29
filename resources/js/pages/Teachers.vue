<template>
  <div class="container-fluid px-0">
    <PageHeader 
      title="Teachers Directory" 
      description="Manage profiles, assignments, and subjects assigned to teaching staff."
    >
      <template #actions>
        <Button variant="primary" icon="bi-person-plus-fill" @click="showMockMsg">
          Add Teacher
        </Button>
      </template>
    </PageHeader>

    <div class="row">
      <div class="col-12">
        <Card>
          <DataTable :columns="columns" :items="teachers" :loading="loading">
            <template #col-name="{ item }">
              <div class="d-flex align-items-center gap-2">
                <Avatar :name="item.name" size="32" variant="success" />
                <div>
                  <span class="fw-semibold d-block text-dark">{{ item.name }}</span>
                  <span class="text-muted small" style="font-size: 0.75rem;">{{ item.email }}</span>
                </div>
              </div>
            </template>
            <template #col-status="{ item }">
              <Badge variant="success">Active</Badge>
            </template>
            <template #actions="{ item }">
              <button class="btn btn-sm btn-light border me-1" @click="viewTeacherDetails(item)">
                <i class="bi-eye-fill text-info"></i>
              </button>
              <button class="btn btn-sm btn-light border me-1" @click="showMockMsg">
                <i class="bi-pencil-fill text-primary"></i>
              </button>
              <button class="btn btn-sm btn-light border" @click="showMockMsg">
                <i class="bi-trash-fill text-danger"></i>
              </button>
            </template>
          </DataTable>
        </Card>
      </div>
    </div>

    <!-- View Teacher Details Modal -->
    <Modal v-model="showViewModal" title="Teacher Profile Details" @close="showViewModal = false">
      <div v-if="selectedTeacher" class="text-dark">
        <div class="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
          <Avatar :name="selectedTeacher.name" size="64" variant="success" />
          <div>
            <h5 class="fw-bold mb-1">{{ selectedTeacher.name }}</h5>
            <span class="badge bg-success-subtle text-success border border-success">Active Teaching Faculty</span>
          </div>
        </div>
        <div class="row g-3">
          <div class="col-6">
            <span class="text-secondary small fw-medium d-block">Department Division</span>
            <span class="fw-semibold">{{ selectedTeacher.department }}</span>
          </div>
          <div class="col-6">
            <span class="text-secondary small fw-medium d-block font-sans">Primary Email</span>
            <span class="fw-semibold">{{ selectedTeacher.email }}</span>
          </div>
          <div class="col-6">
            <span class="text-secondary small fw-medium d-block">Specialization Area</span>
            <span class="fw-semibold">{{ selectedTeacher.specialization }}</span>
          </div>
          <div class="col-6">
            <span class="text-secondary small fw-medium d-block">Assigned Classes</span>
            <span class="fw-semibold">{{ selectedTeacher.classes }}</span>
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
import { ref } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import Card from '../components/Card.vue';
import DataTable from '../components/DataTable.vue';
import Avatar from '../components/Avatar.vue';
import Badge from '../components/Badge.vue';
import Button from '../components/Button.vue';
import Modal from '../components/Modal.vue';

export default {
  name: 'Teachers',
  components: { PageHeader, Card, DataTable, Avatar, Badge, Button, Modal },
  setup() {
    const loading = ref(false);
    const showViewModal = ref(false);
    const selectedTeacher = ref(null);

    const columns = [
      { key: 'name', label: 'Teacher', sortable: true },
      { key: 'department', label: 'Department' },
      { key: 'specialization', label: 'Specialization' },
      { key: 'classes', label: 'Assigned Classes' },
      { key: 'status', label: 'Status' }
    ];

    const teachers = ref([
      { id: 1, name: 'Jane Smith', email: 'jane.smith@sms.edu', department: 'Science', specialization: 'Chemistry & Biology', classes: 'Grade 10-A, Grade 11-A' },
      { id: 2, name: 'Marcus Aurelius', email: 'marcus.a@sms.edu', department: 'Humanities', specialization: 'Ancient History', classes: 'Grade 9-B, Grade 12-A' },
      { id: 3, name: 'Elena Rostova', email: 'elena.r@sms.edu', department: 'Mathematics', specialization: 'Calculus', classes: 'Grade 11-A, Grade 12-C' },
      { id: 4, name: 'David Beckham', email: 'david.b@sms.edu', department: 'Physical Ed', specialization: 'Sports Coaching', classes: 'All Grades' }
    ]);

    const viewTeacherDetails = (teacher) => {
      selectedTeacher.value = teacher;
      showViewModal.value = true;
    };

    const showMockMsg = () => alert('Action simulated (UI Only).');

    return { loading, columns, teachers, showMockMsg, showViewModal, selectedTeacher, viewTeacherDetails };
  }
}
</script>
