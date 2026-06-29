<template>
  <div 
    v-if="modelValue" 
    class="modal fade show d-block" 
    tabindex="-1" 
    role="dialog" 
    style="background: rgba(0, 0, 0, 0.45); z-index: 1050;"
    @click.self="handleBackdropClick"
  >
    <div class="modal-dialog modal-dialog-centered" :class="sizeClass" role="document">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header border-bottom-0 pt-4 px-4 pb-0">
          <h5 class="modal-title fw-bold text-dark">{{ title }}</h5>
          <button 
            v-if="closeButton" 
            type="button" 
            class="btn-close shadow-none" 
            aria-label="Close" 
            @click="close"
          ></button>
        </div>
        <div class="modal-body px-4 py-3">
          <slot></slot>
        </div>
        <div v-if="$slots.footer" class="modal-footer border-top-0 pb-4 px-4 pt-0">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'Modal',
  props: {
    modelValue: { type: Boolean, required: true },
    title: { type: String, default: 'Modal Title' },
    size: { type: String, default: 'md' }, // 'sm', 'md', 'lg', 'xl'
    closeButton: { type: Boolean, default: true },
    closeOnBackdrop: { type: Boolean, default: true }
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { emit }) {
    const sizeClass = computed(() => {
      switch (props.size) {
        case 'sm': return 'modal-sm';
        case 'lg': return 'modal-lg';
        case 'xl': return 'modal-xl';
        default: return '';
      }
    });

    const close = () => {
      emit('update:modelValue', false);
      emit('close');
    };

    const handleBackdropClick = () => {
      if (props.closeOnBackdrop) {
        close();
      }
    };

    return {
      sizeClass,
      close,
      handleBackdropClick
    };
  }
}
</script>
