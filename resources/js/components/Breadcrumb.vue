<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb mb-0 align-items-center">
      <li class="breadcrumb-item d-flex align-items-center">
        <router-link to="/" class="text-secondary text-decoration-none d-flex align-items-center gap-1">
          <i class="bi-house-door-fill text-muted small"></i>
          <span class="d-none d-sm-inline font-monospace small">Home</span>
        </router-link>
      </li>
      
      <li 
        v-for="(crumb, index) in crumbs" 
        :key="index" 
        class="breadcrumb-item d-flex align-items-center"
        :class="{ active: index === crumbs.length - 1 }"
      >
        <span v-if="index === crumbs.length - 1" class="text-dark fw-semibold font-monospace small">
          {{ crumb.label }}
        </span>
        <router-link 
          v-else 
          :to="crumb.path" 
          class="text-secondary text-decoration-none font-monospace small"
        >
          {{ crumb.label }}
        </router-link>
      </li>
    </ol>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'Breadcrumb',
  setup() {
    const route = useRoute();

    const crumbs = computed(() => {
      const pathArray = route.path.split('/').filter(p => p);
      
      return pathArray.map((path, index) => {
        const fullPath = '/' + pathArray.slice(0, index + 1).join('/');
        
        // Capitalize and format path segments for display
        let label = path.charAt(0).toUpperCase() + path.slice(1);
        label = label.replace(/-/g, ' '); // Replace hyphens with spaces

        // Custom mapping for layout titles if needed
        if (label === 'Fees') label = 'Fee Management';

        return {
          label,
          path: fullPath
        };
      });
    });

    return { crumbs };
  }
}
</script>

<style scoped>
.breadcrumb-item + .breadcrumb-item::before {
  font-family: "bootstrap-icons";
  content: "\f285"; /* Chevron right */
  font-size: 0.7rem;
  color: #ccc;
  vertical-align: middle;
}
</style>
