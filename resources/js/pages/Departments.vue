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
              <button class="btn btn-sm btn-light border" @click="showMockMsg"><i class="bi-pencil-fill text-primary"></i></button>
            </template>
          </DataTable>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import Card from '../components/Card.vue';
import DataTable from '../components/DataTable.vue';
import Button from '../components/Button.vue';

export default {
  name: 'Departments',
  components: { PageHeader, Card, DataTable, Button },
  setup() {
    const loading = ref(false);
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

    const showMockMsg = () => alert('Action simulated (UI Only).');

    return { loading, columns, departments, showMockMsg };
  }
}
</script>
