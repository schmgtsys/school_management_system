<template>
  <div class="d-md-flex align-items-center justify-content-between mb-4 pb-2 border-bottom border-light-subtle">
    <div class="mb-3 mb-md-0">
      <h3 class="fw-bold text-dark mb-1" style="font-family: 'Outfit', sans-serif;">{{ title }}</h3>
      <p v-if="description" class="text-muted small mb-0">{{ description }}</p>
    </div>
    <div v-if="$slots.actions" class="d-flex align-items-center gap-2">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: { type: String, required: true },
    description: { type: String, default: '' }
  }
}
</script>
