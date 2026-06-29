<template>
  <div class="dropdown d-inline-block" v-click-outside="close">
    <div @click="toggle" class="dropdown-trigger">
      <slot name="trigger" :isOpen="isOpen">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button">
          Dropdown
        </button>
      </slot>
    </div>
    
    <ul 
      class="dropdown-menu border-0 shadow-sm" 
      :class="[{ show: isOpen }, alignClass]"
      style="margin-top: 5px; z-index: 1040;"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'Dropdown',
  props: {
    align: { type: String, default: 'start' } // 'start', 'end'
  },
  directives: {
    clickOutside: {
      mounted(el, binding) {
        el.clickOutsideEvent = (event) => {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
      },
      unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      }
    }
  },
  setup(props) {
    const isOpen = ref(false);

    const toggle = () => {
      isOpen.value = !isOpen.value;
    };

    const close = () => {
      isOpen.value = false;
    };

    const alignClass = computed(() => {
      return props.align === 'end' ? 'dropdown-menu-end' : '';
    });

    return {
      isOpen,
      toggle,
      close,
      alignClass
    };
  }
}
</script>
