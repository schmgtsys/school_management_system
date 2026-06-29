<template>
  <div class="container-fluid px-0">
    <PageHeader 
      title="Academic Grades & Marks" 
      description="View, record, and publish student assessment transcripts and report cards."
    >
      <template #actions>
        <Button variant="outline-secondary" size="sm" icon="bi-download" @click="showMockMsg">
          Export Report
        </Button>
      </template>
    </PageHeader>

    <div class="row">
      <div class="col-12">
        <Card>
          <DataTable :columns="columns" :items="grades" :loading="loading">
            <template #col-gpa="{ item }">
              <span class="fw-bold text-dark">{{ item.gpa }}</span>
            </template>
            <template #col-performance="{ item }">
              <Badge :variant="getBadgeColor(item.grade)">{{ item.performance }}</Badge>
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
import Badge from '../components/Badge.vue';

export default {
  name: 'Grades',
  components: { PageHeader, Card, DataTable, Button, Badge },
  setup() {
    const loading = ref(false);
    const columns = [
      { key: 'student', label: 'Student', sortable: true },
      { key: 'class', label: 'Class' },
      { key: 'gpa', label: 'GPA Score' },
      { key: 'grade', label: 'Average Grade' },
      { key: 'performance', label: 'Performance Status' }
    ];

    const grades = ref([
      { id: 1, student: 'Liam Sterling', class: 'Grade 10-A', gpa: '3.85', grade: 'A', performance: 'Excellent' },
      { id: 2, student: 'Chloe Vance', class: 'Grade 9-B', gpa: '3.20', grade: 'B', performance: 'Good' },
      { id: 3, student: 'Ethan Hunt', class: 'Grade 11-A', gpa: '1.95', grade: 'D', performance: 'Needs Help' },
      { id: 4, student: 'Mia Wong', class: 'Grade 12-C', gpa: '4.00', grade: 'A+', performance: 'Outstanding' }
    ]);

    const getBadgeColor = (g) => {
      if (g.startsWith('A')) return 'success';
      if (g.startsWith('B')) return 'primary';
      if (g.startsWith('C')) return 'warning';
      return 'danger';
    };

    const showMockMsg = () => alert('Action simulated (UI Only).');

    return { loading, columns, grades, getBadgeColor, showMockMsg };
  }
}
</script>
