<template>
  <nav class="app-navbar navbar navbar-expand px-4">
    <div class="container-fluid px-0 d-flex align-items-center justify-content-between">
      <!-- Left side: Hamburger Toggle & Breadcrumb -->
      <div class="d-flex align-items-center gap-3">
        <button 
          @click="toggleSidebar" 
          class="btn btn-light d-lg-none shadow-none border-0 rounded-circle"
          style="width: 40px; height: 40px;"
        >
          <i class="bi-list fs-5"></i>
        </button>
        <button 
          @click="toggleSidebar" 
          class="btn btn-light d-none d-lg-block shadow-none border-0 rounded-circle"
          style="width: 40px; height: 40px;"
        >
          <i class="bi" :class="isCollapsed ? 'bi-text-indent-left' : 'bi-text-indent-right'"></i >
        </button>
        
        <!-- Breadcrumb component integration -->
        <Breadcrumb class="d-none d-md-block mb-0" />
      </div>

      <!-- Right side: Actions & Controls -->
      <div class="d-flex align-items-center gap-3">
        <!-- Search bar -->
        <div class="d-none d-sm-block">
          <SearchBar placeholder="Search students, staff..." />
        </div>

        <!-- Fullscreen Button -->
        <button 
          @click="toggleFullscreen" 
          class="btn btn-light border-0 shadow-none rounded-circle d-none d-md-flex align-items-center justify-content-center"
          style="width: 40px; height: 40px;"
          title="Toggle Fullscreen"
        >
          <i class="bi" :class="isFullscreen ? 'bi-fullscreen-exit' : 'bi-fullscreen'"></i>
        </button>

        <!-- Theme Switcher -->
        <button 
          @click="toggleTheme" 
          class="btn btn-light border-0 shadow-none rounded-circle d-flex align-items-center justify-content-center"
          style="width: 40px; height: 40px;"
          title="Toggle Light/Dark Theme"
        >
          <i class="bi" :class="theme === 'light' ? 'bi-moon-fill' : 'bi-sun-fill'"></i>
        </button>

        <!-- Language Selector -->
        <Dropdown align="end">
          <template #trigger="{ isOpen }">
            <button class="btn btn-light border-0 shadow-none rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
              <i class="bi-translate"></i>
            </button>
          </template>
          <li><h6 class="dropdown-header">Select Language</h6></li>
          <li><a class="dropdown-item d-flex align-items-center gap-2" href="#" @click.prevent="setLanguage('en')"><span class="fs-6">🇺🇸</span> English <i v-if="language === 'en'" class="bi-check-lg ms-auto text-primary"></i></a></li>
          <li><a class="dropdown-item d-flex align-items-center gap-2" href="#" @click.prevent="setLanguage('es')"><span class="fs-6">🇪🇸</span> Español <i v-if="language === 'es'" class="bi-check-lg ms-auto text-primary"></i></a></li>
          <li><a class="dropdown-item d-flex align-items-center gap-2" href="#" @click.prevent="setLanguage('fr')"><span class="fs-6">🇫🇷</span> Français <i v-if="language === 'fr'" class="bi-check-lg ms-auto text-primary"></i></a></li>
        </Dropdown>

        <!-- Notifications Dropdown -->
        <Dropdown align="end">
          <template #trigger="{ isOpen }">
            <button class="btn btn-light border-0 shadow-none rounded-circle d-flex align-items-center justify-content-center position-relative" style="width: 40px; height: 40px;">
              <i class="bi-bell"></i>
              <span v-if="unreadNotificationsCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="margin-top: 6px; margin-left: -6px;">
                {{ unreadNotificationsCount }}
              </span>
            </button>
          </template>
          <div class="dropdown-menu-header px-3 py-2 border-bottom d-flex align-items-center justify-content-between" style="min-width: 280px;">
            <span class="fw-bold">Notifications</span>
            <a href="#" @click.prevent="markAllRead" class="small text-decoration-none">Mark all read</a>
          </div>
          <div class="overflow-y-auto" style="max-height: 250px;">
            <li v-for="notif in appStore.notifications" :key="notif.id">
              <a class="dropdown-item py-2 border-bottom d-flex gap-2 align-items-start" href="#" :class="{ 'bg-light bg-opacity-50': !notif.read }">
                <div class="bg-primary-subtle text-primary rounded-circle p-1 d-flex align-items-center justify-content-center" style="width: 28px; height: 28px;">
                  <i class="bi-bell-fill small"></i>
                </div>
                <div class="flex-grow-1">
                  <div class="d-flex align-items-center justify-content-between">
                    <span class="fw-semibold small text-dark">{{ notif.title }}</span>
                    <span class="text-muted text-nowrap" style="font-size: 0.7rem;">{{ notif.time }}</span>
                  </div>
                  <p class="text-muted mb-0 small text-truncate" style="max-width: 200px;">{{ notif.message }}</p>
                </div>
              </a>
            </li>
          </div>
          <li class="p-2 text-center"><a class="small text-decoration-none" href="#">View all notifications</a></li>
        </Dropdown>

        <!-- Messages Dropdown -->
        <Dropdown align="end">
          <template #trigger="{ isOpen }">
            <button class="btn btn-light border-0 shadow-none rounded-circle d-flex align-items-center justify-content-center position-relative" style="width: 40px; height: 40px;">
              <i class="bi-chat-left-text"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style="margin-top: 6px; margin-left: -6px;">
                2
              </span>
            </button>
          </template>
          <div class="dropdown-menu-header px-3 py-2 border-bottom d-flex align-items-center justify-content-between" style="min-width: 280px;">
            <span class="fw-bold">Messages</span>
            <a href="#" class="small text-decoration-none">New Message</a>
          </div>
          <div class="overflow-y-auto" style="max-height: 250px;">
            <li v-for="msg in appStore.messages" :key="msg.id">
              <a class="dropdown-item py-2 border-bottom d-flex gap-3 align-items-center" href="#">
                <Avatar :src="msg.avatar" :name="msg.sender" size="32" />
                <div class="flex-grow-1 overflow-hidden">
                  <div class="d-flex align-items-center justify-content-between">
                    <span class="fw-semibold small text-dark">{{ msg.sender }}</span>
                    <span class="text-muted text-nowrap" style="font-size: 0.7rem;">{{ msg.time }}</span>
                  </div>
                  <p class="text-muted mb-0 small text-truncate" style="max-width: 180px;">{{ msg.message }}</p>
                </div>
              </a>
            </li>
          </div>
          <li class="p-2 text-center"><a class="small text-decoration-none" href="#">View all messages</a></li>
        </Dropdown>

        <!-- Vertical Divider -->
        <div class="vr" style="height: 24px;"></div>

        <!-- Profile Dropdown -->
        <Dropdown align="end">
          <template #trigger="{ isOpen }">
            <div class="d-flex align-items-center gap-2 cursor-pointer">
              <Avatar 
                :src="authStore.user.avatar" 
                :name="authStore.user.name" 
                size="36" 
                variant="primary" 
              />
              <div class="d-none d-lg-block text-start" style="line-height: 1.1;">
                <span class="fw-semibold small d-block text-dark">{{ authStore.user.name }}</span>
                <span class="text-muted small" style="font-size: 0.75rem;">{{ authStore.user.role }}</span>
              </div>
            </div>
          </template>
          <li><h6 class="dropdown-header">Manage Account</h6></li>
          <li><router-link class="dropdown-item d-flex align-items-center gap-2 py-2" to="/settings"><i class="bi-person text-muted"></i> My Profile</router-link></li>
          <li><router-link class="dropdown-item d-flex align-items-center gap-2 py-2" to="/settings"><i class="bi-gear text-muted"></i> Account Settings</router-link></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item d-flex align-items-center gap-2 py-2 text-danger" href="#" @click.prevent="logout"><i class="bi-box-arrow-right"></i> Sign Out</a></li>
        </Dropdown>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import { useAppStore } from '../stores/app';
import { useAuthStore } from '../stores/auth';
import Dropdown from './Dropdown.vue';
import Avatar from './Avatar.vue';
import SearchBar from './SearchBar.vue';
import Breadcrumb from './Breadcrumb.vue';

export default {
  name: 'Navbar',
  components: { Dropdown, Avatar, SearchBar, Breadcrumb },
  setup() {
    const appStore = useAppStore();
    const authStore = useAuthStore();
    const isFullscreen = ref(false);

    const isCollapsed = computed(() => appStore.sidebarCollapsed);
    const theme = computed(() => appStore.theme);
    const language = computed(() => appStore.language);

    const unreadNotificationsCount = computed(() => {
      return appStore.notifications.filter(n => !n.read).length;
    });

    const toggleSidebar = () => {
      appStore.toggleSidebar();
    };

    const toggleTheme = () => {
      appStore.toggleTheme();
    };

    const setLanguage = (lang) => {
      appStore.setLanguage(lang);
    };

    const markAllRead = () => {
      appStore.markNotificationsRead();
    };

    const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
          isFullscreen.value = true;
        }).catch((err) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen().then(() => {
          isFullscreen.value = false;
        });
      }
    };

    const logout = () => {
      authStore.clearAuth();
      alert('Sign out triggered (UI only).');
    };

    onMounted(() => {
      document.addEventListener('fullscreenchange', () => {
        isFullscreen.value = !!document.fullscreenElement;
      });
    });

    return {
      appStore,
      authStore,
      isCollapsed,
      theme,
      language,
      isFullscreen,
      unreadNotificationsCount,
      toggleSidebar,
      toggleTheme,
      setLanguage,
      markAllRead,
      toggleFullscreen,
      logout
    };
  }
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.dropdown-menu-header {
  font-size: 0.9rem;
}
</style>
