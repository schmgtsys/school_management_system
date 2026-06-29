<template>
  <div class="container-fluid px-0">
    <PageHeader 
      title="School Departments" 
      description="Manage educational divisions and department head assignments."
    >
      <template #actions>
        <Button variant="primary" icon="bi-plus-lg" @click="showMockMsg">
          New Department
        </Button>
      </template>
    </PageHeader>

    <div class="row">
      <div class="col-12">
        <Card>
          <DataTable :columns="columns" :items="departments" :loading="loading">
            <template #col-budget="{ item }">
              <span class="font-monospace fw-semibold">{{ item.budget }}</span>
            </template>
            <template #actions="{ item }">
              <button class="btn btn-sm btn-light border me-1" @click="viewDepartmentDetails(item)">
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

    <!-- View Department Details Modal -->
    <Modal v-model="showViewModal" title="Department Overview Details" @close="showViewModal = false">
      <div v-if="selectedDepartment" class="text-dark">
        <div class="mb-4 pb-3 border-bottom">
          <span class="badge bg-primary mb-2">Division Unit</span>
          <h4 class="fw-bold mb-1">{{ selectedDepartment.name }}</h4>
        </div>
        <div class="row g-3">
          <div class="col-6">
            <span class="text-secondary small fw-medium d-block">Department Head</span>
            <span class="fw-semibold">{{ selectedDepartment.head }}</span>
          </div>
          <div class="col-6">
            <span class="text-secondary small fw-medium d-block">Annual Operating Budget</span>
            <span class="fw-semibold font-monospace text-success">{{ selectedDepartment.budget }}</span>
          </div>
          <div class="col-6">
            <span class="text-secondary small fw-medium d-block">Assigned Faculty Staff Count</span>
            <span class="fw-semibold">{{ selectedDepartment.staffCount }} Employees</span>
          </div>
          <div class="col-6">
            <span class="text-secondary small fw-medium d-block">Status</span>
            <span class="badge bg-success-subtle text-success border border-success">Active Division</span>
          </div>
        </div>
      </div>
      <template #footer>
        <Button variant="secondary" size="sm" @click="showViewModal = false">Close Overview</Button>
      </template>
    </Modal>
  </div>
</template>

<script>
import { ref } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import Card from '../components/Card.vue';
import DataTable from '../components/DataTable.vue';
import Button from '../components/Button.vue';
import Modal from '../components/Modal.vue';

export default {
  name: 'Departments',
  components: { PageHeader, Card, DataTable, Button, Modal },
  setup() {
    const loading = ref(false);
    const showViewModal = ref(false);
    const selectedDepartment = ref(null);

    const columns = [
      { key: 'name', label: 'Department Name', sortable: true },
      { key: 'head', label: 'Department Head' },
      { key: 'staffCount', label: 'Staff Count' },
      { key: 'budget', label: 'Annual Budget' }
    ];

    const departments = ref([
      { id: 1, name: 'Science & Lab Technology', head: 'Dr. Jane Smith', staffCount: 14, budget: '$45,000' },
      { id: 2, name: 'Mathematics & Computing', head: 'Elena Rostova', staffCount: 8, budget: '$32,000' },
      { id: 3, name: 'Humanities & Languages', head: 'Marcus Aurelius', staffCount: 12, budget: '$28,000' },
      { id: 4, name: 'Administration & Admissions', head: 'Sarah Jenkins', staffCount: 6, budget: '$75,000' }
    ]);

    const viewDepartmentDetails = (dept) => {
      selectedDepartment.value = dept;
      showViewModal.value = true;
    };

    const showMockMsg = () => alert('Action simulated (UI Only).');

    return { loading, columns, departments, showMockMsg, showViewModal, selectedDepartment, viewDepartmentDetails };
  }
}
</script>
