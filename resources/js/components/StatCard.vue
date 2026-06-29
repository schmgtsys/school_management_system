<template>
  <div class="card card-dashboard">
    <div class="card-body p-4">
      <div class="d-flex align-items-center justify-content-between">
        <div>
          <span class="text-uppercase font-monospace text-muted small fw-bold tracking-wider">{{ title }}</span>
          <h3 class="fw-bold mb-1 mt-2 text-dark">{{ value }}</h3>
          
          <div v-if="trend !== null" class="d-flex align-items-center gap-1 mt-2">
            <span :class="[trendUp ? 'text-success' : 'text-danger', 'small', 'fw-semibold']">
              <i :class="[trendUp ? 'bi-arrow-up-short' : 'bi-arrow-down-short', 'fs-6']"></i>
              {{ Math.abs(trend) }}%
            </span>
            <span class="text-muted small">vs last month</span>
          </div>
        </div>
        
        <div class="stat-card-icon-container" :class="[`bg-${variant}-subtle`, `text-${variant}`]">
          <slot name="icon">
            <i v-if="icon" :class="[icon, 'fs-4']"></i>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'StatCard',
  props: {
    title: { type: String, required: true },
    value: { type: [String, Number], required: true },
    icon: { type: String, default: '' }, // bootstrap icon class
    variant: { type: String, default: 'primary' }, // primary, success, warning, danger, info
    trend: { type: Number, default: null } // numerical percentage value
  },
  setup(props) {
    const trendUp = computed(() => props.trend >= 0);
    return { trendUp };
  }
}
</script>

<style scoped>
.tracking-wider {
  letter-spacing: 0.05em;
}
</style>
