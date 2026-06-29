<template>
  <div class="container-fluid px-0">
    <PageHeader 
      title="Library Management" 
      description="Track academic books database, issues, borrowings, and overdue books."
    >
      <template #actions>
        <Button variant="primary" icon="bi-plus-lg" @click="showMockMsg">
          Issue Book
        </Button>
      </template>
    </PageHeader>

    <div class="row">
      <div class="col-12">
        <Card>
          <DataTable :columns="columns" :items="books" :loading="loading">
            <template #col-status="{ item }">
              <Badge :variant="item.status === 'Available' ? 'success' : 'warning'">{{ item.status }}</Badge>
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
  name: 'Library',
  components: { PageHeader, Card, DataTable, Button, Badge },
  setup() {
    const loading = ref(false);
    const columns = [
      { key: 'title', label: 'Book Title', sortable: true },
      { key: 'author', label: 'Author' },
      { key: 'isbn', label: 'ISBN Code' },
      { key: 'category', label: 'Category' },
      { key: 'status', label: 'Status' }
    ];

    const books = ref([
      { id: 1, title: 'Introduction to Organic Chemistry', author: 'Dr. Jane Smith', isbn: '978-3-16-148410-0', category: 'Science', status: 'Available' },
      { id: 2, title: 'Advanced Calculus Methods', author: 'Elena Rostova', isbn: '978-0-12-345678-6', category: 'Mathematics', status: 'Borrowed' },
      { id: 3, title: 'The Rise and Fall of Rome', author: 'Marcus Aurelius', isbn: '978-1-23-456789-0', category: 'History', status: 'Available' }
    ]);

    const showMockMsg = () => alert('Action simulated (UI Only).');

    return { loading, columns, books, showMockMsg };
  }
}
</script>
