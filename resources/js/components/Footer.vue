<template>
  <footer class="app-footer text-muted py-3">
    <div class="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
      <!-- Copyright and Developer info -->
      <div class="text-center text-md-start w-100 d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div class="lh-base">
          <div>&copy; {{ currentYear }} <span class="fw-semibold text-dark">School Management System</span> | All Rights Reserved</div>
        </div>
        <div class="mt-2 mt-md-0 d-flex flex-column flex-md-row align-items-center gap-2 gap-md-3">
          <div class="small">Designed by : <span class="text-primary fw-semibold">NUBB Student Year 4 Thesis project</span></div>
          <span class="badge bg-light text-secondary border font-monospace px-2 py-1">v1.0.0-beta</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'Footer',
  setup() {
    const currentYear = computed(() => new Date().getFullYear());
    return { currentYear };
  }
}
</script>
