<template>
  <nav v-if="totalPages > 1" aria-label="Page navigation" class="d-flex align-items-center justify-content-between py-3">
    <div class="small text-muted">
      Showing <span class="fw-semibold">{{ startItem }}</span> to <span class="fw-semibold">{{ endItem }}</span> of <span class="fw-semibold">{{ totalItems }}</span> entries
    </div>
    <ul class="pagination pagination-sm mb-0">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link shadow-none" href="#" @click.prevent="changePage(currentPage - 1)">
          <i class="bi-chevron-left"></i>
        </a>
      </li>
      
      <li 
        v-for="page in visiblePages" 
        :key="page" 
        class="page-item" 
        :class="{ active: currentPage === page, disabled: page === '...' }"
      >
        <a 
          class="page-link shadow-none" 
          href="#" 
          @click.prevent="page !== '...' && changePage(page)"
        >
          {{ page }}
        </a>
      </li>

      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link shadow-none" href="#" @click.prevent="changePage(currentPage + 1)">
          <i class="bi-chevron-right"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'Pagination',
  props: {
    currentPage: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },
    totalItems: { type: Number, required: true }
  },
  emits: ['page-changed'],
  setup(props, { emit }) {
    const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize));
    
    const startItem = computed(() => {
      if (props.totalItems === 0) return 0;
      return (props.currentPage - 1) * props.pageSize + 1;
    });

    const endItem = computed(() => {
      return Math.min(props.currentPage * props.pageSize, props.totalItems);
    });

    const visiblePages = computed(() => {
      const pages = [];
      const total = totalPages.value;
      const current = props.currentPage;

      if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i);
      } else {
        if (current <= 4) {
          pages.push(1, 2, 3, 4, 5, '...', total);
        } else if (current >= total - 3) {
          pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
        } else {
          pages.push(1, '...', current - 1, current, current + 1, '...', total);
        }
      }
      return pages;
    });

    const changePage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        emit('page-changed', page);
      }
    };

    return {
      totalPages,
      startItem,
      endItem,
      visiblePages,
      changePage
    };
  }
}
</script>
