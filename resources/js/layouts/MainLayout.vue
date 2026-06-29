<template>
  <div class="d-flex min-vh-100">
    <!-- Collapsible Sidebar -->
    <Sidebar />

    <!-- Overlay backdrop for mobile when sidebar is open -->
    <div 
      v-if="!isSidebarCollapsed" 
      class="d-lg-none position-fixed top-0 start-0 w-100 h-100" 
      style="background: rgba(0, 0, 0, 0.4); z-index: 1025;" 
      @click="closeSidebarOnMobile"
    ></div>

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
import { computed, onMounted, onUnmounted } from 'vue';
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

    let lastWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth < 992 && lastWidth >= 992) {
        appStore.setSidebarCollapsed(true);
      } else if (currentWidth >= 992 && lastWidth < 992) {
        appStore.setSidebarCollapsed(false);
      }
      lastWidth = currentWidth;
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
      // Run once on mount to align initial window size
      if (window.innerWidth < 992) {
        appStore.setSidebarCollapsed(true);
      }
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });

    const closeSidebarOnMobile = () => {
      appStore.setSidebarCollapsed(true);
    };

    return {
      isSidebarCollapsed,
      closeSidebarOnMobile
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
