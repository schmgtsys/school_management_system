<template>
  <div 
    v-if="visible" 
    class="alert alert-dismissible fade show d-flex align-items-center gap-3 border-0 shadow-sm"
    :class="[`alert-${variant}`, { 'bg-opacity-10 text-dark border-start border-4': soft, [`border-${variant}`]: soft }]"
    role="alert"
  >
    <i v-if="iconClass" :class="[iconClass, `text-${variant}`]" style="font-size: 1.25rem;"></i>
    <div class="flex-grow-1">
      <slot></slot>
    </div>
    <button 
      v-if="dismissible" 
      type="button" 
      class="btn-close shadow-none" 
      aria-label="Close"
      @click="close"
    ></button>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'Alert',
  props: {
    variant: { type: String, default: 'primary' },
    dismissible: { type: Boolean, default: false },
    soft: { type: Boolean, default: true }, // soft background
    icon: { type: String, default: '' } // optional custom icon
  },
  emits: ['close'],
  setup(props, { emit }) {
    const visible = ref(true);

    const iconClass = computed(() => {
      if (props.icon) return props.icon;
      switch (props.variant) {
        case 'success': return 'bi-check-circle-fill';
        case 'danger': return 'bi-exclamation-octagon-fill';
        case 'warning': return 'bi-exclamation-triangle-fill';
        case 'info': return 'bi-info-circle-fill';
        default: return 'bi-bell-fill';
      }
    });

    const close = () => {
      visible.value = false;
      emit('close');
    };

    return {
      visible,
      iconClass,
      close
    };
  }
}
</script>
