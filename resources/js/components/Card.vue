<template>
  <div class="card" :class="[{ 'border-0 shadow-sm': shadow, 'card-dashboard': hover }]">
    <div v-if="$slots.header || title" class="card-header bg-transparent border-bottom d-flex align-items-center justify-content-between py-3">
      <slot name="header">
        <h6 class="m-0 fw-semibold text-dark">{{ title }}</h6>
      </slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="card-footer bg-transparent border-top py-3">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: { type: String, default: '' },
    shadow: { type: Boolean, default: true },
    hover: { type: Boolean, default: false } // Trigger dashboard animations
  }
}
</script>
