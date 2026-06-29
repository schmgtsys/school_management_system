<template>
  <div class="card card-dashboard h-100">
    <div class="card-header bg-transparent border-0 d-flex align-items-center justify-content-between pt-4 pb-0 px-4">
      <div>
        <h5 v-if="title" class="card-title fw-bold mb-0 text-dark" style="font-size: 1.1rem;">{{ title }}</h5>
        <p v-if="subtitle" class="card-subtitle text-muted small mt-1 mb-0">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.actions" class="card-actions">
        <slot name="actions"></slot>
      </div>
    </div>
    <div class="card-body px-4 py-3">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="card-footer bg-transparent border-0 pt-0 pb-4 px-4">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardCard',
  props: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' }
  }
}
</script>
