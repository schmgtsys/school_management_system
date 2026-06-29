<template>
  <router-view />
</template>

<script>
import { onMounted } from 'vue';
import { useAppStore } from './stores/app';

export default {
  name: 'App',
  setup() {
    const appStore = useAppStore();
    
    onMounted(() => {
      // Apply correct theme on startup
      document.documentElement.setAttribute('data-bs-theme', appStore.theme);
    });
  }
}
</script>
