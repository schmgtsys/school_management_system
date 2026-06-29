<template>
  <div class="container-fluid px-0">
    <PageHeader 
      title="Examinations Schedules" 
      description="Manage exam terms, subject schedules, classrooms, and proctors."
    >
      <template #actions>
        <Button variant="primary" icon="bi-plus-lg" @click="showMockMsg">
          Schedule Exam
        </Button>
      </template>
    </PageHeader>

    <div class="row">
      <div class="col-12">
        <Card>
          <DataTable :columns="columns" :items="exams" :loading="loading">
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
  name: 'Examinations',
  components: { PageHeader, Card, DataTable, Button },
  setup() {
    const loading = ref(false);
    const columns = [
      { key: 'title', label: 'Exam Title', sortable: true },
      { key: 'subject', label: 'Subject' },
      { key: 'date', label: 'Exam Date' },
      { key: 'duration', label: 'Duration' },
      { key: 'room', label: 'Exam Hall' }
    ];

    const exams = ref([
      { id: 1, title: 'Midterm Term 2', subject: 'Calculus BC', date: '2026-06-23', duration: '2 Hours', room: 'Hall B' },
      { id: 2, title: 'Final Term 2 Practical', subject: 'Chemistry 1 Lab', date: '2026-06-25', duration: '3 Hours', room: 'Chemistry Lab B' },
      { id: 3, title: 'Class Assessment Test 4', subject: 'World History', date: '2026-06-28', duration: '1 Hour', room: 'Building A, Room 102' }
    ]);

    const showMockMsg = () => alert('Action simulated (UI Only).');

    return { loading, columns, exams, showMockMsg };
  }
}
</script>
