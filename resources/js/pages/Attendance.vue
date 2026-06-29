<template>
  <div class="container-fluid px-0">
    <PageHeader 
      title="Daily Attendance Logs" 
      description="Track and submit daily student attendance across classrooms."
    >
      <template #actions>
        <select class="form-select form-select-sm" style="width: 150px;">
          <option>Grade 10-A</option>
          <option>Grade 9-B</option>
        </select>
        <Button variant="success" icon="bi-check-all" @click="showMockMsg">
          Submit Attendance
        </Button>
      </template>
    </PageHeader>

    <div class="row">
      <div class="col-12">
        <Card>
          <DataTable :columns="columns" :items="attendanceRecords" :loading="loading">
            <template #col-status="{ item }">
              <div class="d-flex gap-2">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" :name="'att-'+item.id" :id="'p-'+item.id" :checked="item.status === 'Present'" />
                  <label class="form-check-label text-success small fw-semibold" :for="'p-'+item.id">Present</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" :name="'att-'+item.id" :id="'a-'+item.id" :checked="item.status === 'Absent'" />
                  <label class="form-check-label text-danger small fw-semibold" :for="'a-'+item.id">Absent</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" :name="'att-'+item.id" :id="'l-'+item.id" :checked="item.status === 'Late'" />
                  <label class="form-check-label text-warning small fw-semibold" :for="'l-'+item.id">Late</label>
                </div>
              </div>
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
  name: 'Attendance',
  components: { PageHeader, Card, DataTable, Button },
  setup() {
    const loading = ref(false);
    const columns = [
      { key: 'student', label: 'Student Name', sortable: true },
      { key: 'roll', label: 'Roll Number' },
      { key: 'status', label: 'Attendance Status' }
    ];

    const attendanceRecords = ref([
      { id: 1, student: 'Liam Sterling', roll: '2610A01', status: 'Present' },
      { id: 2, student: 'Chloe Vance', roll: '2610A02', status: 'Present' },
      { id: 3, student: 'Ethan Hunt', roll: '2610A03', status: 'Absent' },
      { id: 4, student: 'Mia Wong', roll: '2610A04', status: 'Late' }
    ]);

    const showMockMsg = () => alert('Attendance logged (UI Only).');

    return { loading, columns, attendanceRecords, showMockMsg };
  }
}
</script>
