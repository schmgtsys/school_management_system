<template>
  <div class="container-fluid px-0">
    <PageHeader 
      title="Staff Payroll Logs" 
      description="Track monthly payroll calculations, gross salaries, and payment dispatch details."
    >
      <template #actions>
        <Button variant="primary" icon="bi-calculator-fill" @click="showMockMsg">
          Process Payroll
        </Button>
      </template>
    </PageHeader>

    <div class="row">
      <div class="col-12">
        <Card>
          <DataTable :columns="columns" :items="payrollRecords" :loading="loading">
            <template #col-salary="{ item }">
              <span class="font-monospace fw-semibold">{{ item.salary }}</span>
            </template>
            <template #col-status="{ item }">
              <Badge variant="success">Paid</Badge>
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
  name: 'Payroll',
  components: { PageHeader, Card, DataTable, Button, Badge },
  setup() {
    const loading = ref(false);
    const columns = [
      { key: 'name', label: 'Employee', sortable: true },
      { key: 'role', label: 'Role/Duty' },
      { key: 'salary', label: 'Gross Salary' },
      { key: 'payPeriod', label: 'Pay Period' },
      { key: 'status', label: 'Status' }
    ];

    const payrollRecords = ref([
      { id: 1, name: 'Jane Smith', role: 'Chemistry Teacher', salary: '$4,200', payPeriod: 'June 2026' },
      { id: 2, name: 'Marcus Aurelius', role: 'History Teacher', salary: '$4,100', payPeriod: 'June 2026' },
      { id: 3, name: 'Jonathan Archer', role: 'IT Admin', salary: '$3,800', payPeriod: 'June 2026' }
    ]);

    const showMockMsg = () => alert('Payroll computation triggered (UI Only).');

    return { loading, columns, payrollRecords, showMockMsg };
  }
}
</script>
