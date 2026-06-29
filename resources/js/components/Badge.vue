<template>
  <span 
    class="badge" 
    :class="[
      `bg-${variant}`, 
      { 'rounded-pill': pill, [`bg-opacity-10 text-${variant}`]: soft }
    ]"
  >
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    variant: { type: String, default: 'primary' },
    pill: { type: Boolean, default: false },
    soft: { type: Boolean, default: true }
  }
}
</script>
