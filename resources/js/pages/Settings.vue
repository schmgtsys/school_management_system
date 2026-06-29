<template>
  <div class="container-fluid px-0">
    <PageHeader 
      title="Settings Panel" 
      description="Configure institution profile, application environments, visuals, and secure user registration policies."
    />

    <div class="row">
      <!-- Settings Configurations Contents -->
      <div class="col-12">
        <Card>
          <!-- Tab 1: School General Settings -->
          <div v-if="activeTab === 'general'">
            <h5 class="fw-bold mb-3 text-dark border-bottom pb-2">School General Settings</h5>
            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="form-label text-secondary small fw-medium">School Name</label>
                <input type="text" class="form-control" value="EduSphere Academic Academy" />
              </div>
              <div class="col-md-6">
                <label class="form-label text-secondary small fw-medium">Establishment Code</label>
                <input type="text" class="form-control font-monospace" value="EDU-2026-99" readonly />
              </div>
            </div>
            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="form-label text-secondary small fw-medium">Primary Support Email</label>
                <input type="email" class="form-control" value="info@edusphere.edu" />
              </div>
              <div class="col-md-6">
                <label class="form-label text-secondary small fw-medium">Contact Phone</label>
                <input type="text" class="form-control" value="+1 (555) 123-4567" />
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label text-secondary small fw-medium">Campus Address</label>
              <textarea class="form-control" rows="2">789 Education Blvd, Sector 9, Campus Plaza</textarea>
            </div>
            <Button variant="primary" @click="saveMock">Save General Info</Button>
          </div>

          <!-- Tab 2: System Settings -->
          <div v-if="activeTab === 'system'">
            <h5 class="fw-bold mb-3 text-dark border-bottom pb-2">System Settings</h5>
            
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

            <div class="row g-3 mb-4">
              <div class="col-md-6">
                <label class="form-label text-secondary small fw-medium">Application Environment</label>
                <select class="form-select">
                  <option selected>Production (Secure)</option>
                  <option>Staging</option>
                  <option>Development</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label text-secondary small fw-medium">Maintenance Mode</label>
                <div class="form-check form-switch pt-2">
                  <input class="form-check-input" type="checkbox" role="switch" id="maintenanceSwitch">
                  <label class="form-check-label text-muted small" for="maintenanceSwitch">Enable offline mode for general public</label>
                </div>
              </div>
            </div>

            <h6 class="fw-bold mb-3 text-dark">API & Integrations Keys</h6>
            <div class="p-3 bg-light rounded-3 mb-4 d-flex align-items-center justify-content-between border">
              <div>
                <span class="fw-bold d-block text-dark small font-monospace">token_live_7942...x28</span>
                <span class="text-muted small">Created: 2 weeks ago &bull; Permissions: Read-Write</span>
              </div>
              <Button variant="danger" size="sm" @click="saveMock">Revoke</Button>
            </div>
            
            <Button variant="primary" @click="saveMock">Apply System Settings</Button>
          </div>

          <!-- Tab 3: User Management Settings -->
          <div v-if="activeTab === 'users'">
            <h5 class="fw-bold mb-3 text-dark border-bottom pb-2">User Management Settings</h5>
            
            <div class="row g-3 mb-4">
              <div class="col-md-6">
                <label class="form-label text-secondary small fw-medium">User Registration Policy</label>
                <select class="form-select">
                  <option>Disable registration (Invite only)</option>
                  <option selected>Enable with Email Verification</option>
                  <option>Enable open enrollment</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label text-secondary small fw-medium">Session Idle Timeout</label>
                <select class="form-select">
                  <option>15 Minutes</option>
                  <option selected>30 Minutes</option>
                  <option>1 Hour</option>
                  <option>2 Hours</option>
                </select>
              </div>
            </div>

            <h6 class="fw-bold mb-3 text-dark">Password Complexity Rules</h6>
            <div class="mb-4">
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" id="passRule1" checked>
                <label class="form-check-label small" for="passRule1">Require at least 8 characters</label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" id="passRule2" checked>
                <label class="form-check-label small" for="passRule2">Require numbers (0-9)</label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" id="passRule3" checked>
                <label class="form-check-label small" for="passRule3">Require special characters (@, #, $, etc.)</label>
              </div>
            </div>

            <h6 class="fw-bold mb-3 text-dark">Active System Roles</h6>
            <div class="table-responsive mb-4">
              <table class="table table-sm table-bordered align-middle">
                <thead class="table-light">
                  <tr>
                    <th>Role ID</th>
                    <th>Role Name</th>
                    <th>Permissions Level</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code class="small">admin</code></td>
                    <td>Super Administrator</td>
                    <td><span class="badge bg-danger">Full Access</span></td>
                    <td><button class="btn btn-link btn-sm text-decoration-none p-0" disabled>System Lock</button></td>
                  </tr>
                  <tr>
                    <td><code class="small">teacher</code></td>
                    <td>Teaching Staff</td>
                    <td><span class="badge bg-warning text-dark">Classroom Only</span></td>
                    <td><button class="btn btn-link btn-sm text-decoration-none p-0" @click="saveMock">Edit</button></td>
                  </tr>
                  <tr>
                    <td><code class="small">student</code></td>
                    <td>Registered Student</td>
                    <td><span class="badge bg-success">Personal Panel</span></td>
                    <td><button class="btn btn-link btn-sm text-decoration-none p-0" @click="saveMock">Edit</button></td>
                  </tr>
                  <tr>
                    <td><code class="small">parent</code></td>
                    <td>Family Guardian</td>
                    <td><span class="badge bg-info text-dark">Student Access</span></td>
                    <td><button class="btn btn-link btn-sm text-decoration-none p-0" @click="saveMock">Edit</button></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Button variant="primary" @click="saveMock">Save User Policies</Button>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import Card from '../components/Card.vue';
import Button from '../components/Button.vue';
import { useAppStore } from '../stores/app';

export default {
  name: 'Settings',
  components: { PageHeader, Card, Button },
  props: {
    defaultTab: {
      type: String,
      default: 'general'
    }
  },
  setup(props) {
    const appStore = useAppStore();
    const activeTab = ref(props.defaultTab);

    // Watch prop from router to update active tab when navigating
    watch(() => props.defaultTab, (newTab) => {
      activeTab.value = newTab;
    });

    const theme = computed(() => appStore.theme);

    const setTheme = (mode) => {
      if (mode !== appStore.theme) {
        appStore.toggleTheme();
      }
    };

    const saveMock = () => {
      alert('Settings saved successfully (UI Only).');
    };

    return { activeTab, theme, setTheme, saveMock };
  }
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
