<template>
  <div class="container-fluid px-0">
    <PageHeader 
      title="Non-Teaching Staff" 
      description="Manage administrative, support, IT, and maintenance employee records."
    >
      <template #actions>
        <Button variant="primary" icon="bi-person-plus-fill" @click="showMockMsg">
          Add Staff Member
        </Button>
      </template>
    </PageHeader>

    <div class="row">
      <div class="col-12">
        <Card>
          <DataTable :columns="columns" :items="staff" :loading="loading">
            <template #col-name="{ item }">
              <div class="d-flex align-items-center gap-2">
                <Avatar :name="item.name" size="32" variant="info" />
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
              <button class="btn btn-sm btn-light border me-1" @click="viewStaffDetails(item)">
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

    <!-- View Staff Details Modal -->
    <Modal v-model="showViewModal" title="Staff Profile Details" @close="showViewModal = false">
      <div v-if="selectedStaff" class="text-dark">
        <div class="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
          <Avatar :name="selectedStaff.name" size="64" variant="info" />
          <div>
            <h5 class="fw-bold mb-1">{{ selectedStaff.name }}</h5>
            <span class="badge bg-info-subtle text-info border border-info">Support Staff Faculty</span>
          </div>
        </div>
        <div class="row g-3">
          <div class="col-6">
            <span class="text-secondary small fw-medium d-block">System Duty / Role</span>
            <span class="fw-semibold">{{ selectedStaff.role }}</span>
          </div>
          <div class="col-6">
            <span class="text-secondary small fw-medium d-block">Department Group</span>
            <span class="fw-semibold">{{ selectedStaff.department }}</span>
          </div>
          <div class="col-6">
            <span class="text-secondary small fw-medium d-block">Contact Phone</span>
            <span class="fw-semibold font-monospace">{{ selectedStaff.phone }}</span>
          </div>
          <div class="col-6">
            <span class="text-secondary small fw-medium d-block">Primary Email</span>
            <span class="fw-semibold">{{ selectedStaff.email }}</span>
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
  name: 'Staff',
  components: { PageHeader, Card, DataTable, Avatar, Badge, Button, Modal },
  setup() {
    const loading = ref(false);
    const showViewModal = ref(false);
    const selectedStaff = ref(null);

    const columns = [
      { key: 'name', label: 'Staff Member', sortable: true },
      { key: 'role', label: 'Role/Duty' },
      { key: 'department', label: 'Department' },
      { key: 'phone', label: 'Phone Number' },
      { key: 'status', label: 'Status' }
    ];

    const staff = ref([
      { id: 1, name: 'Jonathan Archer', email: 'j.archer@sms.edu', role: 'IT System Admin', department: 'Technology', phone: '+1 555-0192' },
      { id: 2, name: 'T\'Pol Jenkins', email: 'tpol@sms.edu', role: 'Chief Registrar', department: 'Administration', phone: '+1 555-0145' },
      { id: 3, name: 'Phlox Smith', email: 'dr.phlox@sms.edu', role: 'Campus Nurse', department: 'Medical Support', phone: '+1 555-0177' }
    ]);

    const viewStaffDetails = (s) => {
      selectedStaff.value = s;
      showViewModal.value = true;
    };

    const showMockMsg = () => alert('Action simulated (UI Only).');

    return { loading, columns, staff, showMockMsg, showViewModal, selectedStaff, viewStaffDetails };
  }
}
</script>
