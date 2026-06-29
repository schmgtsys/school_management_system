<template>
  <div class="position-relative d-inline-block" :style="{ width: size + 'px', height: size + 'px' }">
    <img
      v-if="src && !imageError"
      :src="src"
      :alt="alt"
      class="rounded-circle border"
      style="width: 100%; height: 100%; object-fit: cover;"
      @error="imageError = true"
    />
    <div
      v-else
      class="rounded-circle d-flex align-items-center justify-content-center fw-semibold text-white uppercase border"
      :class="variantClass"
      style="width: 100%; height: 100%; font-size: 0.9em;"
    >
      {{ initials }}
    </div>
    <span
      v-if="status"
      class="position-absolute bottom-0 end-0 border border-white rounded-circle p-1"
      :class="statusClass"
      style="transform: translate(25%, 25%); width: 12px; height: 12px;"
    ></span>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'Avatar',
  props: {
    src: { type: String, default: '' },
    alt: { type: String, default: 'User' },
    size: { type: [Number, String], default: 40 },
    name: { type: String, default: '' },
    status: { type: String, default: '' }, // 'online', 'offline', 'away'
    variant: { type: String, default: 'primary' } // bootstrap colors
  },
  setup(props) {
    const imageError = ref(false);

    const initials = computed(() => {
      if (!props.name) return '?';
      const parts = props.name.trim().split(/\s+/);
      if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    });

    const variantClass = computed(() => `bg-${props.variant}`);

    const statusClass = computed(() => {
      switch (props.status) {
        case 'online': return 'bg-success';
        case 'offline': return 'bg-secondary';
        case 'away': return 'bg-warning';
        default: return '';
      }
    });

    return {
      imageError,
      initials,
      variantClass,
      statusClass
    };
  }
}
</script>
