<template>
  <div class="container-fluid px-0">
    <PageHeader 
      title="Fee Management" 
      description="Track student invoices, tuition structures, collected payments, and balances."
    >
      <template #actions>
        <Button variant="primary" icon="bi-plus-lg" @click="showMockMsg">
          Record Payment
        </Button>
      </template>
    </PageHeader>

    <div class="row">
      <div class="col-12">
        <Card>
          <DataTable :columns="columns" :items="invoices" :loading="loading">
            <template #col-amount="{ item }">
              <span class="font-monospace fw-semibold">{{ item.amount }}</span>
            </template>
            <template #col-paid="{ item }">
              <span class="font-monospace text-success fw-semibold">{{ item.paid }}</span>
            </template>
            <template #col-balance="{ item }">
              <span class="font-monospace text-danger fw-semibold">{{ item.balance }}</span>
            </template>
            <template #col-status="{ item }">
              <Badge :variant="item.status === 'Fully Paid' ? 'success' : (item.status === 'Partial' ? 'warning' : 'danger')">
                {{ item.status }}
              </Badge>
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
  name: 'FeeManagement',
  components: { PageHeader, Card, DataTable, Button, Badge },
  setup() {
    const loading = ref(false);
    const columns = [
      { key: 'student', label: 'Student Name', sortable: true },
      { key: 'invoiceNumber', label: 'Invoice No.' },
      { key: 'amount', label: 'Total Due' },
      { key: 'paid', label: 'Amount Paid' },
      { key: 'balance', label: 'Remaining Balance' },
      { key: 'status', label: 'Status' }
    ];

    const invoices = ref([
      { id: 1, student: 'Liam Sterling', invoiceNumber: 'INV-2026-104', amount: '$2,500', paid: '$2,500', balance: '$0', status: 'Fully Paid' },
      { id: 2, student: 'Chloe Vance', invoiceNumber: 'INV-2026-105', amount: '$2,500', paid: '$1,500', balance: '$1,000', status: 'Partial' },
      { id: 3, student: 'Ethan Hunt', invoiceNumber: 'INV-2026-106', amount: '$2,500', paid: '$0', balance: '$2,500', status: 'Unpaid' },
      { id: 4, student: 'Mia Wong', invoiceNumber: 'INV-2026-107', amount: '$3,000', paid: '$3,000', balance: '$0', status: 'Fully Paid' }
    ]);

    const showMockMsg = () => alert('Action simulated (UI Only).');

    return { loading, columns, invoices, showMockMsg };
  }
}
</script>
