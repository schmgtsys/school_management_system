<template>
  <aside class="app-sidebar" :class="{ 'collapsed': isCollapsed }">
    <!-- Sidebar Header -->
    <div class="sidebar-header d-flex align-items-center justify-content-between">
      <div 
        class="d-flex align-items-center gap-2 overflow-hidden" 
        :class="{ 'cursor-pointer': isCollapsed }"
        @click="isCollapsed ? toggleSidebar() : null"
        :title="isCollapsed ? 'Expand Sidebar' : ''"
      >
        <div class="bg-primary text-white rounded-3 p-2 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; min-width: 40px;">
          <i class="bi-mortarboard-fill fs-4"></i>
        </div>
        <div class="sidebar-brand-text fw-bold text-white fs-5 text-nowrap" style="font-family: 'Outfit', sans-serif;">
          EduSphere
        </div>
      </div>
      <!-- Toggle button inside sidebar (visible on desktop) -->
      <button v-if="!isCollapsed" @click="toggleSidebar" class="btn btn-link text-white text-opacity-75 p-0 d-none d-lg-block border-0 shadow-none">
        <i class="bi" :class="isCollapsed ? 'bi-text-indent-left' : 'bi-text-indent-right'" style="font-size: 1.25rem;"></i>
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
    <div class="sidebar-menu overflow-y-auto">
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
            @click.prevent="toggleSubmenu('academic')"
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
            class="dropdown-menu border-0 shadow-lg py-2" 
            :class="{ show: expandedMenus.academic }"
            style="position: absolute; left: var(--sidebar-collapsed-width); top: 0; background-color: var(--sidebar-bg); min-width: 160px; z-index: 1050;"
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

        <!-- Settings -->
        <li class="nav-item">
          <router-link to="/settings" class="nav-link" active-class="active">
            <i class="bi-gear-fill"></i>
            <span class="menu-item-text">Settings</span>
          </router-link>
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
      academic: false
    });

    const toggleSidebar = () => {
      appStore.toggleSidebar();
    };

    const toggleSubmenu = (menu) => {
      expandedMenus.value[menu] = !expandedMenus.value[menu];
    };

    const isSubmenuActive = (menu) => {
      if (menu === 'academic') {
        return route.path.startsWith('/academic/');
      }
      return false;
    };

    // Auto-expand submenu if active route is nested inside
    watch(() => route.path, (newPath) => {
      if (newPath.startsWith('/academic/')) {
        expandedMenus.value.academic = true;
      }
    }, { immediate: true });

    return {
      isCollapsed,
      authStore,
      expandedMenus,
      toggleSidebar,
      toggleSubmenu,
      isSubmenuActive
    };
  }
}
</script>

<style scoped>
.transition-transform {
  transition: transform 0.2s ease;
}
</style>
