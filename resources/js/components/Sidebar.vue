<template>
  <aside class="app-sidebar" :class="{ 'collapsed': isCollapsed }">
    <!-- Sidebar Header -->
    <div class="sidebar-header d-flex align-items-center" :class="isCollapsed ? 'justify-content-center' : 'justify-content-between'">
      <div 
        v-if="!isCollapsed"
        class="d-flex align-items-center gap-2 overflow-hidden" 
      >
        <div class="bg-primary text-white rounded-3 p-2 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; min-width: 40px;">
          <i class="bi-mortarboard-fill fs-4"></i>
        </div>
        <div class="sidebar-brand-text fw-bold text-white fs-5 text-nowrap" style="font-family: 'Outfit', sans-serif;">
          EduSphere
        </div>
      </div>
      <!-- Toggle button inside sidebar -->
      <button @click="toggleSidebar" class="btn btn-link text-white text-opacity-75 p-0 border-0 shadow-none">
        <i class="bi" :class="isCollapsed ? 'bi-list' : 'bi-text-indent-right'" style="font-size: 1.5rem;"></i>
      </button>
    </div>

    <!-- Sidebar User Section -->
    <div class="sidebar-user">
      <div class="d-flex align-items-center gap-3 overflow-hidden">
        <Avatar 
          :src="authStore.user.avatar" 
          :name="authStore.user.name" 
          status="online" 
          size="42" 
          variant="primary" 
        />
        <div class="sidebar-user-info text-nowrap">
          <h6 class="text-white mb-0 fw-semibold text-truncate" style="max-width: 150px;">{{ authStore.user.name }}</h6>
          <span class="text-muted small text-truncate d-block" style="max-width: 150px;">{{ authStore.user.role }}</span>
        </div>
      </div>
    </div>

    <!-- Sidebar Navigation Menu -->
    <div class="sidebar-menu overflow-y-auto" @scroll="closeFloatingMenus">
      <ul class="nav flex-column">
        <!-- Dashboard -->
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">
            <i class="bi-grid-1x2-fill"></i>
            <span class="menu-item-text">Dashboard</span>
          </router-link>
        </li>

        <!-- Core Sections Title -->
        <li class="sidebar-section-title">Core Management</li>

        <!-- Students -->
        <li class="nav-item">
          <router-link to="/students" class="nav-link" active-class="active">
            <i class="bi-people-fill"></i>
            <span class="menu-item-text">Students</span>
          </router-link>
        </li>

        <!-- Teachers -->
        <li class="nav-item">
          <router-link to="/teachers" class="nav-link" active-class="active">
            <i class="bi-person-badge-fill"></i>
            <span class="menu-item-text">Teachers</span>
          </router-link>
        </li>

        <!-- Staff -->
        <li class="nav-item">
          <router-link to="/staff" class="nav-link" active-class="active">
            <i class="bi-person-workspace"></i>
            <span class="menu-item-text">Staff</span>
          </router-link>
        </li>

        <!-- Departments -->
        <li class="nav-item">
          <router-link to="/departments" class="nav-link" active-class="active">
            <i class="bi-building-fill"></i>
            <span class="menu-item-text">Departments</span>
          </router-link>
        </li>

        <!-- Academic & Classes Dropdown -->
        <li class="nav-item-dropdown position-relative">
          <a 
            class="nav-link d-flex align-items-center" 
            href="#" 
            @click.prevent="toggleSubmenu('academic', $event)"
            :class="{ 'active': isSubmenuActive('academic') }"
          >
            <i class="bi-journal-bookmark-fill"></i>
            <span class="menu-item-text">Academic</span>
            <i 
              v-if="!isCollapsed"
              class="bi small menu-dropdown-arrow transition-transform ms-auto" 
              :class="expandedMenus.academic ? 'bi-chevron-down' : 'bi-chevron-right'"
            ></i>
          </a>
          <!-- Nested Dropdown Menus (when sidebar is expanded) -->
          <ul 
            v-if="!isCollapsed"
            v-show="expandedMenus.academic" 
            class="dropdown-submenu"
          >
            <li>
              <router-link to="/academic/classes" class="nav-link" active-class="active">
                <i class="bi-door-closed-fill"></i>
                Classes
              </router-link>
            </li>
            <li>
              <router-link to="/academic/subjects" class="nav-link" active-class="active">
                <i class="bi-journal-text"></i>
                Subjects
              </router-link>
            </li>
            <li>
              <router-link to="/academic/attendance" class="nav-link" active-class="active">
                <i class="bi-calendar-check-fill"></i>
                Attendance
              </router-link>
            </li>
            <li>
              <router-link to="/academic/examinations" class="nav-link" active-class="active">
                <i class="bi-patch-question-fill"></i>
                Examinations
              </router-link>
            </li>
            <li>
              <router-link to="/academic/grades" class="nav-link" active-class="active">
                <i class="bi-award-fill"></i>
                Grades
              </router-link>
            </li>
          </ul>

          <!-- Floating Dropdown Menu (when sidebar is collapsed) -->
          <ul 
            v-else
            class="dropdown-menu shadow-lg py-2" 
            :class="{ show: expandedMenus.academic }"
            :style="{ position: 'fixed', left: 'var(--sidebar-collapsed-width)', top: menuPositions.academic.top, bottom: menuPositions.academic.bottom, backgroundColor: 'var(--sidebar-bg)', minWidth: '160px', zIndex: 1050 }"
          >
            <li>
              <router-link to="/academic/classes" class="nav-link" active-class="active" @click="expandedMenus.academic = false">
                <i class="bi-door-closed-fill"></i>
                <span>Classes</span>
              </router-link>
            </li>
            <li>
              <router-link to="/academic/subjects" class="nav-link" active-class="active" @click="expandedMenus.academic = false">
                <i class="bi-journal-text"></i>
                <span>Subjects</span>
              </router-link>
            </li>
            <li>
              <router-link to="/academic/attendance" class="nav-link" active-class="active" @click="expandedMenus.academic = false">
                <i class="bi-calendar-check-fill"></i>
                <span>Attendance</span>
              </router-link>
            </li>
            <li>
              <router-link to="/academic/examinations" class="nav-link" active-class="active" @click="expandedMenus.academic = false">
                <i class="bi-patch-question-fill"></i>
                <span>Examinations</span>
              </router-link>
            </li>
            <li>
              <router-link to="/academic/grades" class="nav-link" active-class="active" @click="expandedMenus.academic = false">
                <i class="bi-award-fill"></i>
                <span>Grades</span>
              </router-link>
            </li>
          </ul>
        </li>

        <!-- Finance Title -->
        <li class="sidebar-section-title">Finance & Library</li>

        <!-- Fee Management -->
        <li class="nav-item">
          <router-link to="/fees" class="nav-link" active-class="active">
            <i class="bi-credit-card-fill"></i>
            <span class="menu-item-text">Fee Management</span>
          </router-link>
        </li>

        <!-- Payroll -->
        <li class="nav-item">
          <router-link to="/payroll" class="nav-link" active-class="active">
            <i class="bi-cash-coin"></i>
            <span class="menu-item-text">Payroll</span>
          </router-link>
        </li>

        <!-- Library -->
        <li class="nav-item">
          <router-link to="/library" class="nav-link" active-class="active">
            <i class="bi-book-half"></i>
            <span class="menu-item-text">Library</span>
          </router-link>
        </li>

        <!-- System Title -->
        <li class="sidebar-section-title">System</li>

        <!-- Reports -->
        <li class="nav-item">
          <router-link to="/reports" class="nav-link" active-class="active">
            <i class="bi-bar-chart-line-fill"></i>
            <span class="menu-item-text">Reports</span>
          </router-link>
        </li>

        <!-- Settings Dropdown -->
        <li class="nav-item-dropdown position-relative">
          <a 
            class="nav-link d-flex align-items-center" 
            href="#" 
            @click.prevent="toggleSubmenu('settings', $event)"
            :class="{ 'active': isSubmenuActive('settings') }"
          >
            <i class="bi-gear-fill"></i>
            <span class="menu-item-text">Settings</span>
            <i 
              v-if="!isCollapsed"
              class="bi small menu-dropdown-arrow transition-transform ms-auto" 
              :class="expandedMenus.settings ? 'bi-chevron-down' : 'bi-chevron-right'"
            ></i>
          </a>
          <!-- Nested Dropdown Menus (when sidebar is expanded) -->
          <ul 
            v-if="!isCollapsed"
            v-show="expandedMenus.settings" 
            class="dropdown-submenu"
          >
            <li>
              <router-link to="/settings/general" class="nav-link" active-class="active">
                <i class="bi-building-fill"></i>
                General Settings
              </router-link>
            </li>
            <li>
              <router-link to="/settings/system" class="nav-link" active-class="active">
                <i class="bi-sliders"></i>
                System Settings
              </router-link>
            </li>
            <li>
              <router-link to="/settings/users" class="nav-link" active-class="active">
                <i class="bi-people-fill"></i>
                User Management
              </router-link>
            </li>
          </ul>

          <!-- Floating Dropdown Menu (when sidebar is collapsed) -->
          <ul 
            v-else
            class="dropdown-menu shadow-lg py-2" 
            :class="{ show: expandedMenus.settings }"
            :style="{ position: 'fixed', left: 'var(--sidebar-collapsed-width)', top: menuPositions.settings.top, bottom: menuPositions.settings.bottom, backgroundColor: 'var(--sidebar-bg)', minWidth: '175px', zIndex: 1050 }"
          >
            <li>
              <router-link to="/settings/general" class="nav-link" active-class="active" @click="expandedMenus.settings = false">
                <i class="bi-building-fill"></i>
                <span>General Settings</span>
              </router-link>
            </li>
            <li>
              <router-link to="/settings/system" class="nav-link" active-class="active" @click="expandedMenus.settings = false">
                <i class="bi-sliders"></i>
                <span>System Settings</span>
              </router-link>
            </li>
            <li>
              <router-link to="/settings/users" class="nav-link" active-class="active" @click="expandedMenus.settings = false">
                <i class="bi-people-fill"></i>
                <span>User Management</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useAppStore } from '../stores/app';
import { useAuthStore } from '../stores/auth';
import { useRoute } from 'vue-router';
import Avatar from './Avatar.vue';

export default {
  name: 'Sidebar',
  components: { Avatar },
  setup() {
    const appStore = useAppStore();
    const authStore = useAuthStore();
    const route = useRoute();

    const isCollapsed = computed(() => appStore.sidebarCollapsed);

    const expandedMenus = ref({
      academic: false,
      settings: false
    });

    const toggleSidebar = () => {
      appStore.toggleSidebar();
    };

    const menuPositions = ref({
      academic: { top: 'auto', bottom: 'auto' },
      settings: { top: 'auto', bottom: 'auto' }
    });

    const toggleSubmenu = (menu, event) => {
      // Close sibling floating menu
      if (menu === 'academic') {
        expandedMenus.value.settings = false;
      } else {
        expandedMenus.value.academic = false;
      }

      expandedMenus.value[menu] = !expandedMenus.value[menu];

      if (expandedMenus.value[menu] && isCollapsed.value && event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
        
        // Calculate if there is enough space below the item
        // Assume max dropdown height is around 250px
        const spaceBelow = viewportHeight - rect.bottom;
        
        if (spaceBelow < 250) {
          // Render upwards, aligning the bottom of the menu with the bottom of the anchor
          menuPositions.value[menu] = {
            top: 'auto',
            bottom: `${viewportHeight - rect.bottom}px`
          };
        } else {
          // Render downwards, aligning the top of the menu with the top of the anchor
          menuPositions.value[menu] = {
            top: `${rect.top}px`,
            bottom: 'auto'
          };
        }
      }
    };

    const isSubmenuActive = (menu) => {
      if (menu === 'academic') {
        return route.path.startsWith('/academic/');
      }
      if (menu === 'settings') {
        return route.path.startsWith('/settings/');
      }
      return false;
    };

    // Auto-expand/collapse submenus based on active route, and auto-collapse on mobile
    watch(() => route.path, (newPath) => {
      // Academic Submenu
      if (!isCollapsed.value && newPath.startsWith('/academic/')) {
        expandedMenus.value.academic = true;
      } else {
        expandedMenus.value.academic = false;
      }

      // Settings Submenu
      if (!isCollapsed.value && newPath.startsWith('/settings/')) {
        expandedMenus.value.settings = true;
      } else {
        expandedMenus.value.settings = false;
      }
      
      // Auto-collapse sidebar on mobile/tablet viewports after navigation
      if (typeof window !== 'undefined' && window.innerWidth < 992) {
        appStore.setSidebarCollapsed(true);
      }
    }, { immediate: true });

    // Watch collapsed state to close submenu
    watch(isCollapsed, (collapsed) => {
      if (collapsed) {
        expandedMenus.value.academic = false;
        expandedMenus.value.settings = false;
      }
    });

    const closeFloatingMenus = () => {
      if (isCollapsed.value) {
        expandedMenus.value.academic = false;
        expandedMenus.value.settings = false;
      }
    };

    return {
      isCollapsed,
      authStore,
      expandedMenus,
      toggleSidebar,
      toggleSubmenu,
      isSubmenuActive,
      closeFloatingMenus,
      menuPositions
    };
  }
}
</script>

<style scoped>
.transition-transform {
  transition: transform 0.2s ease;
}
</style>
