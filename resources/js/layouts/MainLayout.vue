<template>
  <div class="d-flex min-vh-100">
    <!-- Collapsible Sidebar -->
    <Sidebar />

    <!-- Main Workspace Container -->
    <div class="app-wrapper flex-grow-1" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <!-- Header Navigation -->
      <Navbar />

      <!-- Core Content -->
      <main class="app-content bg-light bg-opacity-50">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useAppStore } from '../stores/app';
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'MainLayout',
  components: { Sidebar, Navbar, Footer },
  setup() {
    const appStore = useAppStore();
    const isSidebarCollapsed = computed(() => appStore.sidebarCollapsed);

    return {
      isSidebarCollapsed
    };
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
