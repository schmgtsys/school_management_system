<template>
  <div class="container-fluid px-0">
    <PageHeader 
      title="Academic & Financial Reports" 
      description="Access and download generated summaries of school activities and grades."
    />

    <div class="row g-4">
      <div class="col-12 col-md-6 col-xl-4" v-for="rep in reportsList" :key="rep.id">
        <Card :title="rep.name" :hover="true">
          <p class="text-muted small mb-4">{{ rep.description }}</p>
          <div class="d-flex align-items-center justify-content-between pt-2 border-top border-light-subtle">
            <span class="small font-monospace text-secondary">Format: {{ rep.format }}</span>
            <Button variant="primary" size="sm" icon="bi-download" @click="downloadMock(rep.name)">
              Generate
            </Button>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import Card from '../components/Card.vue';
import Button from '../components/Button.vue';

export default {
  name: 'Reports',
  components: { PageHeader, Card, Button },
  setup() {
    const reportsList = ref([
      { id: 1, name: 'Student Attendance Summary', description: 'Monthly aggregates of daily class presence, absences and lates.', format: 'PDF / Excel' },
      { id: 2, name: 'Term Financial Statement', description: 'Breakdown of tuition collected, payroll disbursed, and miscellaneous balances.', format: 'Excel' },
      { id: 3, name: 'Academic Transcripts Compilation', description: 'Export of grade books across classrooms for student reports.', format: 'PDF' },
      { id: 4, name: 'Staff Workload Analysis', description: 'Overview of subject and timetable hour distributions by teacher.', format: 'PDF' }
    ]);

    const downloadMock = (name) => {
      alert(`Generating ${name} in background. Check your browser downloads shortly (UI Only).`);
    };

    return { reportsList, downloadMock };
  }
}
</script>
