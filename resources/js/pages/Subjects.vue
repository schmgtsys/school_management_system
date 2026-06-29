<template>
  <div class="container-fluid px-0">
    <PageHeader 
      title="Subjects Curriculums" 
      description="Manage study subjects, syllabus descriptions, and credits allocation."
    >
      <template #actions>
        <Button variant="primary" icon="bi-plus-lg" @click="showMockMsg">
          New Subject
        </Button>
      </template>
    </PageHeader>

    <div class="row">
      <div class="col-12">
        <Card>
          <DataTable :columns="columns" :items="subjects" :loading="loading">
            <template #col-credits="{ item }">
              <Badge variant="primary" :soft="true">{{ item.credits }} Credits</Badge>
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
import Badge from '../components/Badge.vue';

export default {
  name: 'Subjects',
  components: { PageHeader, Card, DataTable, Button, Badge },
  setup() {
    const loading = ref(false);
    const columns = [
      { key: 'name', label: 'Subject Name', sortable: true },
      { key: 'code', label: 'Subject Code' },
      { key: 'department', label: 'Department' },
      { key: 'credits', label: 'Academic Credits' }
    ];

    const subjects = ref([
      { id: 1, name: 'General Chemistry 1', code: 'CHM-101', department: 'Science', credits: 4 },
      { id: 2, name: 'Calculus BC', code: 'MTH-203', department: 'Mathematics', credits: 5 },
      { id: 3, name: 'World History Ancient times', code: 'HIS-110', department: 'Humanities', credits: 3 },
      { id: 4, name: 'Computer Programming Introductory', code: 'CS-101', department: 'Mathematics', credits: 4 }
    ]);

    const showMockMsg = () => alert('Action simulated (UI Only).');

    return { loading, columns, subjects, showMockMsg };
  }
}
</script>
