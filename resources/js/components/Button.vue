<template>
  <button
    :type="type"
    class="btn d-inline-flex align-items-center justify-content-center gap-2"
    :class="[`btn-${variant}`, size ? `btn-${size}` : '']"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    <i v-if="icon && !loading" :class="icon"></i>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: { type: String, default: 'button' },
    variant: { type: String, default: 'primary' },
    size: { type: String, default: '' }, // 'sm', 'lg'
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    icon: { type: String, default: '' } // bootstrap-icons class e.g. 'bi-plus'
  }
}
</script>
