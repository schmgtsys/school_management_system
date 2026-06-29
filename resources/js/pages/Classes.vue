<template>
  <div class="container-fluid px-0">
    <PageHeader 
      title="Classroom Divisions" 
      description="Overview of classrooms, capacities, and homeroom advisors."
    >
      <template #actions>
        <Button variant="primary" icon="bi-plus-lg" @click="showMockMsg">
          New Class
        </Button>
      </template>
    </PageHeader>

    <div class="row">
      <div class="col-12">
        <Card>
          <DataTable :columns="columns" :items="classes" :loading="loading">
            <template #col-utilization="{ item }">
              <div class="d-flex align-items-center gap-2">
                <div class="progress flex-grow-1" style="height: 6px; min-width: 100px;">
                  <div 
                    class="progress-bar" 
                    :class="getProgressColor(item.studentsCount / item.capacity)"
                    :style="{ width: ((item.studentsCount / item.capacity) * 100) + '%' }"
                  ></div>
                </div>
                <span class="small font-monospace fw-semibold">{{ item.studentsCount }}/{{ item.capacity }}</span>
              </div>
            </template>
            <template #actions="{ item }">
              <button class="btn btn-sm btn-light border" @click="showMockMsg"><i class="bi-eye-fill text-primary"></i></button>
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
  name: 'Classes',
  components: { PageHeader, Card, DataTable, Button },
  setup() {
    const loading = ref(false);
    const columns = [
      { key: 'name', label: 'Class Name', sortable: true },
      { key: 'homeroomAdvisor', label: 'Homeroom Advisor' },
      { key: 'location', label: 'Location' },
      { key: 'utilization', label: 'Enrollment Capacity' }
    ];

    const classes = ref([
      { id: 1, name: 'Grade 9-A', homeroomAdvisor: 'Marcus Aurelius', location: 'Building A, Room 102', studentsCount: 28, capacity: 30 },
      { id: 2, name: 'Grade 10-A', homeroomAdvisor: 'Jane Smith', location: 'Building B, Room 204', studentsCount: 30, capacity: 30 },
      { id: 3, name: 'Grade 11-A', homeroomAdvisor: 'Elena Rostova', location: 'Building B, Room 205', studentsCount: 22, capacity: 30 },
      { id: 4, name: 'Grade 12-C', homeroomAdvisor: 'N/A', location: 'Building C, Room 301', studentsCount: 15, capacity: 25 }
    ]);

    const getProgressColor = (val) => {
      if (val >= 1) return 'bg-danger';
      if (val >= 0.8) return 'bg-warning';
      return 'bg-success';
    };

    const showMockMsg = () => alert('Action simulated (UI Only).');

    return { loading, columns, classes, getProgressColor, showMockMsg };
  }
}
</script>
