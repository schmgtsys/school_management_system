<template>
  <div class="text-center py-5 px-4 bg-white rounded shadow-sm border border-light-subtle d-flex flex-column align-items-center justify-content-center">
    <div 
      class="rounded-circle d-flex align-items-center justify-content-center mb-4 bg-light text-muted" 
      style="width: 70px; height: 70px;"
    >
      <i :class="[icon, 'fs-1']"></i>
    </div>
    <h5 class="fw-bold text-dark mb-2">{{ title }}</h5>
    <p class="text-muted small mb-4 text-center" style="max-width: 360px;">{{ description }}</p>
    <div v-if="$slots.actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    title: { type: String, default: 'No data matches found' },
    description: { type: String, default: 'It seems there are no records available at the moment. Try modifying your filters or create a new entry.' },
    icon: { type: String, default: 'bi-inbox' }
  }
}
</script>
