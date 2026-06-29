<template>
  <footer class="app-footer text-muted py-3">
    <div class="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
      <!-- Left side: copyright -->
      <div class="text-center text-md-start">
        &copy; {{ currentYear }} <span class="fw-semibold text-dark">EduSphere Enterprise</span>. All rights reserved.
      </div>
      
      <!-- Right side: Developer info & version -->
      <div class="d-flex align-items-center gap-3 justify-content-center text-center text-md-end">
        <span>Designed by <a href="#" class="text-primary text-decoration-none fw-semibold">Antigravity Development</a></span>
        <span class="vr d-none d-sm-inline" style="height: 15px;"></span>
        <span class="badge bg-light text-secondary border font-monospace px-2 py-1">v1.0.0-beta</span>
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
