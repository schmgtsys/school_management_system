<template>
  <div class="container-fluid px-0">
    <PageHeader 
      title="System Settings" 
      description="Configure core metadata parameters, theme settings, API tokens, and user options."
    />

    <div class="row">
      <!-- Settings Tab Navigations -->
      <div class="col-12 col-md-3 mb-4">
        <div class="list-group border-0 shadow-sm rounded-3">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            class="list-group-item list-group-item-action border-0 px-3 py-2-5 d-flex align-items-center gap-2"
            :class="{ 'active fw-semibold': activeTab === tab.id }"
            style="transition: all 0.2s;"
          >
            <i :class="tab.icon"></i>
            {{ tab.name }}
          </button>
        </div>
      </div>

      <!-- Settings Configurations Contents -->
      <div class="col-12 col-md-9">
        <Card>
          <!-- Tab 1: Institution Details -->
          <div v-if="activeTab === 'general'">
            <h5 class="fw-bold mb-3 text-dark border-bottom pb-2">Institution Information</h5>
            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="form-label text-secondary small fw-medium">School Name</label>
                <input type="text" class="form-control" value="St. Jude Academic Enterprise" />
              </div>
              <div class="col-md-6">
                <label class="form-label text-secondary small fw-medium">Establishment Code</label>
                <input type="text" class="form-control font-monospace" value="SCH-2026-99" readonly />
              </div>
            </div>
            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="form-label text-secondary small fw-medium">Primary Support Email</label>
                <input type="email" class="form-control" value="admin@stjude.edu" />
              </div>
              <div class="col-md-6">
                <label class="form-label text-secondary small fw-medium">Contact Phone</label>
                <input type="text" class="form-control" value="+1 (555) 019-2041" />
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label text-secondary small fw-medium">Campus Address</label>
              <textarea class="form-control" rows="2">102 Academic Ave, Sector 4, Silicon Valley</textarea>
            </div>
            <Button variant="primary" @click="saveMock">Save Changes</Button>
          </div>

          <!-- Tab 2: Theme Settings -->
          <div v-if="activeTab === 'appearance'">
            <h5 class="fw-bold mb-3 text-dark border-bottom pb-2">Visual & Layout Options</h5>
            <div class="mb-4">
              <label class="form-label d-block text-secondary small fw-medium">Active Interface Theme</label>
              <div class="d-flex gap-3">
                <div class="border rounded-3 p-3 text-center cursor-pointer flex-grow-1" :class="{ 'border-primary bg-primary-subtle text-primary': theme === 'light' }" @click="setTheme('light')" style="max-width: 150px;">
                  <i class="bi-sun-fill fs-3 mb-2 d-block"></i>
                  <span class="fw-semibold small">Light Mode</span>
                </div>
                <div class="border rounded-3 p-3 text-center cursor-pointer flex-grow-1" :class="{ 'border-primary bg-primary-subtle text-primary': theme === 'dark' }" @click="setTheme('dark')" style="max-width: 150px;">
                  <i class="bi-moon-fill fs-3 mb-2 d-block"></i>
                  <span class="fw-semibold small">Dark Mode</span>
                </div>
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label text-secondary small fw-medium">Global Font Family</label>
              <select class="form-select" style="max-width: 280px;">
                <option>Inter / Outfit (Recommended)</option>
                <option>System Default sans-serif</option>
              </select>
            </div>
            <Button variant="primary" @click="saveMock">Apply Layouts</Button>
          </div>

          <!-- Tab 3: Security & Keys -->
          <div v-if="activeTab === 'security'">
            <h5 class="fw-bold mb-3 text-dark border-bottom pb-2">Access Tokens & API Keys</h5>
            <p class="text-muted small mb-4">Manage authorization API tokens for integrations and mobile school applications.</p>
            <div class="p-3 bg-light rounded-3 mb-4 d-flex align-items-center justify-content-between border">
              <div>
                <span class="fw-bold d-block text-dark small font-monospace">token_live_7942...x28</span>
                <span class="text-muted small">Created: 2 weeks ago &bull; Permissions: Read-Write</span>
              </div>
              <Button variant="danger" size="sm" @click="saveMock">Revoke</Button>
            </div>
            <Button variant="primary" size="sm" icon="bi-key-fill" @click="saveMock">Generate New Token</Button>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import Card from '../components/Card.vue';
import Button from '../components/Button.vue';
import { useAppStore } from '../stores/app';

export default {
  name: 'Settings',
  components: { PageHeader, Card, Button },
  setup() {
    const appStore = useAppStore();
    const activeTab = ref('general');

    const tabs = [
      { id: 'general', name: 'General Information', icon: 'bi-building-fill' },
      { id: 'appearance', name: 'Appearance Details', icon: 'bi-palette-fill' },
      { id: 'security', name: 'API & Security Keys', icon: 'bi-shield-lock-fill' }
    ];

    const theme = computed(() => appStore.theme);

    const setTheme = (mode) => {
      if (mode !== appStore.theme) {
        appStore.toggleTheme();
      }
    };

    const saveMock = () => {
      alert('Settings saved successfully (UI Only).');
    };

    return { activeTab, tabs, theme, setTheme, saveMock };
  }
}
</script>

<style scoped>
.py-2-5 {
  padding-top: 0.65rem;
  padding-bottom: 0.65rem;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
