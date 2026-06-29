<template>
  <div class="container-fluid px-0">
    <!-- Page Header Component -->
    <PageHeader 
      title="School Overview Dashboard" 
      description="Welcome back to EduSphere! Here's what is happening across your school campus today."
    >
      <template #actions>
        <Button variant="outline-secondary" size="sm" icon="bi-arrow-repeat" @click="refreshDashboard">
          Refresh
        </Button>
        <Button variant="primary" size="sm" icon="bi-plus-lg" @click="showQuickEnroll = true">
          Quick Enroll
        </Button>
      </template>
    </PageHeader>

    <!-- Welcome Alert banner -->
    <div class="row mb-4">
      <div class="col-12">
        <Alert variant="info" :dismissible="true">
          <span class="fw-bold">Notice:</span> High School Term 2 reports must be approved by Friday. Please review academic grades.
        </Alert>
      </div>
    </div>

    <!-- Statistics Cards Section -->
    <div class="row g-4 mb-4">
      <div class="col-12 col-sm-6 col-xl-3">
        <StatCard title="Total Students" value="1,248" icon="bi-people-fill" variant="primary" :trend="4.8" />
      </div>
      <div class="col-12 col-sm-6 col-xl-3">
        <StatCard title="Active Teachers" value="84" icon="bi-person-badge-fill" variant="success" :trend="1.2" />
      </div>
      <div class="col-12 col-sm-6 col-xl-3">
        <StatCard title="Daily Attendance" value="96.2%" icon="bi-calendar-check-fill" variant="warning" :trend="-0.5" />
      </div>
      <div class="col-12 col-sm-6 col-xl-3">
        <StatCard title="Monthly Revenue" value="$42,850" icon="bi-credit-card-fill" variant="info" :trend="8.3" />
      </div>
    </div>

    <!-- Central Analytics & Widgets -->
    <div class="row g-4 mb-4">
      <!-- Revenue Card & CSS Chart -->
      <div class="col-12 col-lg-8">
        <DashboardCard title="Revenue Performance" subtitle="Tuition fees and payroll comparison over the last 6 months">
          <template #actions>
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-secondary active">6 Months</button>
              <button class="btn btn-outline-secondary">Year</button>
            </div>
          </template>
          
          <!-- Modern CSS-based Bar Chart Placeholder -->
          <div class="chart-container py-4">
            <div class="d-flex justify-content-between align-items-end h-100 px-3" style="min-height: 220px;">
              <div v-for="bar in revenueChartData" :key="bar.month" class="d-flex flex-column align-items-center w-100">
                <div class="d-flex gap-2 align-items-end justify-content-center w-100" style="height: 180px;">
                  <!-- Tuition Bar -->
                  <div 
                    class="bg-primary rounded-top cursor-pointer-chart" 
                    :style="{ height: bar.tuition + '%' }"
                    :title="`Tuition: $${bar.tuitionVal}`"
                    style="width: 24px; transition: height 0.5s ease;"
                  ></div>
                  <!-- Payroll Bar -->
                  <div 
                    class="bg-danger-subtle rounded-top cursor-pointer-chart" 
                    :style="{ height: bar.payroll + '%' }"
                    :title="`Payroll: $${bar.payrollVal}`"
                    style="width: 24px; transition: height 0.5s ease;"
                  ></div>
                </div>
                <span class="mt-2 text-muted small font-monospace">{{ bar.month }}</span>
              </div>
            </div>
            
            <div class="d-flex justify-content-center gap-4 mt-3 pt-3 border-top border-light-subtle">
              <div class="d-flex align-items-center gap-2 small">
                <span class="d-inline-block bg-primary rounded-circle" style="width: 10px; height: 10px;"></span>
                <span class="text-secondary">Tuition Fees Collected</span>
              </div>
              <div class="d-flex align-items-center gap-2 small">
                <span class="d-inline-block bg-danger-subtle rounded-circle" style="width: 10px; height: 10px;"></span>
                <span class="text-secondary">Payroll Disbursed</span>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>

      <!-- Quick Actions & Activities -->
      <div class="col-12 col-lg-4">
        <DashboardCard title="Quick Tasks" subtitle="Common actions and tools">
          <div class="list-group list-group-flush gap-2 border-0 mt-2">
            <a href="#" @click.prevent="showModal('enroll')" class="list-group-item list-group-item-action d-flex align-items-center justify-content-between p-3 border rounded-3 bg-light bg-opacity-50">
              <div class="d-flex align-items-center gap-3">
                <div class="p-2 bg-primary text-white rounded-3 d-flex align-items-center justify-content-center" style="width: 38px; height: 38px;">
                  <i class="bi-person-plus-fill"></i>
                </div>
                <div>
                  <h6 class="mb-0 fw-semibold">Enroll New Student</h6>
                  <span class="text-muted small">Register a student to a class</span>
                </div>
              </div>
              <i class="bi-chevron-right text-muted"></i>
            </a>
            <a href="#" @click.prevent="showModal('fee')" class="list-group-item list-group-item-action d-flex align-items-center justify-content-between p-3 border rounded-3 bg-light bg-opacity-50">
              <div class="d-flex align-items-center gap-3">
                <div class="p-2 bg-success text-white rounded-3 d-flex align-items-center justify-content-center" style="width: 38px; height: 38px;">
                  <i class="bi-receipt"></i>
                </div>
                <div>
                  <h6 class="mb-0 fw-semibold">Record Fee Payment</h6>
                  <span class="text-muted small">Issue receipt & invoice</span>
                </div>
              </div>
              <i class="bi-chevron-right text-muted"></i>
            </a>
            <a href="#" @click.prevent="showModal('exam')" class="list-group-item list-group-item-action d-flex align-items-center justify-content-between p-3 border rounded-3 bg-light bg-opacity-50">
              <div class="d-flex align-items-center gap-3">
                <div class="p-2 bg-warning text-dark rounded-3 d-flex align-items-center justify-content-center" style="width: 38px; height: 38px;">
                  <i class="bi-file-earmark-spreadsheet-fill"></i>
                </div>
                <div>
                  <h6 class="mb-0 fw-semibold">Update Exam Grades</h6>
                  <span class="text-muted small">Input grades by subjects</span>
                </div>
              </div>
              <i class="bi-chevron-right text-muted"></i>
            </a>
          </div>
        </DashboardCard>
      </div>
    </div>

    <!-- Lists & Summaries Row -->
    <div class="row g-4 mb-4">
      <!-- Recent Registrants -->
      <div class="col-12 col-xl-6">
        <DashboardCard title="Recent Student Enrollments" subtitle="Newly registered students inside current active term">
          <DataTable :columns="studentColumns" :items="recentStudents" :loading="loadingData">
            <template #col-name="{ item }">
              <div class="d-flex align-items-center gap-2">
                <Avatar :name="item.name" size="30" variant="secondary" />
                <span class="fw-semibold text-dark">{{ item.name }}</span>
              </div>
            </template>
            <template #col-status="{ item }">
              <Badge :variant="item.status === 'Active' ? 'success' : 'warning'">{{ item.status }}</Badge>
            </template>
          </DataTable>
        </DashboardCard>
      </div>

      <!-- Calendar Placeholder Widget -->
      <div class="col-12 col-xl-6">
        <DashboardCard title="School Events Calendar" subtitle="Upcoming academic schedules and breaks">
          <div class="calendar-widget p-3 border rounded-3">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h6 class="fw-bold text-dark mb-0">June 2026</h6>
              <div class="d-flex gap-1">
                <button class="btn btn-sm btn-light py-1 px-2 border"><i class="bi-chevron-left"></i></button>
                <button class="btn btn-sm btn-light py-1 px-2 border"><i class="bi-chevron-right"></i></button>
              </div>
            </div>
            <div class="row text-center fw-bold text-muted small g-1 mb-2">
              <div class="col" v-for="day in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']" :key="day">{{ day }}</div>
            </div>
            <!-- Dynamic styling mockup grid -->
            <div class="row text-center g-1 mb-3">
              <div class="col py-2 text-muted" v-for="d in [28,29,30]" :key="'prev-'+d">{{ d }}</div>
              <div class="col py-2 border rounded-circle bg-primary text-white" style="max-width: 36px; margin: 0 auto;">1</div>
              <div class="col py-2" v-for="d in [2,3,4,5,6]" :key="d">{{ d }}</div>
            </div>
            <div class="row text-center g-1 mb-3">
              <div class="col py-2" v-for="d in [7,8,9,10]" :key="d">{{ d }}</div>
              <div class="col py-2 border rounded-circle bg-warning-subtle text-warning" style="max-width: 36px; margin: 0 auto;">11</div>
              <div class="col py-2" v-for="d in [12,13]" :key="d">{{ d }}</div>
            </div>
            <div class="row text-center g-1 mb-3">
              <div class="col py-2" v-for="d in [14,15,16,17,18,19,20]" :key="d">{{ d }}</div>
            </div>
            <div class="row text-center g-1 mb-3">
              <div class="col py-2" v-for="d in [21,22]" :key="d">{{ d }}</div>
              <div class="col py-2 border rounded-circle bg-danger-subtle text-danger" style="max-width: 36px; margin: 0 auto;">23</div>
              <div class="col py-2" v-for="d in [24,25,26,27]" :key="d">{{ d }}</div>
            </div>
            
            <!-- Events list -->
            <div class="events-list mt-3">
              <div class="d-flex align-items-start gap-2 mb-2">
                <span class="badge bg-primary mt-1" style="width: 8px; height: 8px; padding: 0; border-radius: 50%;"></span>
                <div class="small">
                  <span class="fw-semibold text-dark">Jun 1:</span> School Assembly (Term 2 Kickoff)
                </div>
              </div>
              <div class="d-flex align-items-start gap-2 mb-2">
                <span class="badge bg-warning mt-1" style="width: 8px; height: 8px; padding: 0; border-radius: 50%;"></span>
                <div class="small">
                  <span class="fw-semibold text-dark">Jun 11:</span> Parent-Teacher Association Meeting
                </div>
              </div>
              <div class="d-flex align-items-start gap-2">
                <span class="badge bg-danger mt-1" style="width: 8px; height: 8px; padding: 0; border-radius: 50%;"></span>
                <div class="small">
                  <span class="fw-semibold text-dark">Jun 23:</span> Mid-Term Examinations begin
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>

    <!-- Bottom Announcements & Recent Activity -->
    <div class="row g-4">
      <div class="col-12 col-lg-6">
        <DashboardCard title="Campus Announcements" subtitle="Recent updates published by management">
          <div class="announcements mt-2">
            <div class="p-3 mb-3 border rounded bg-light bg-opacity-25">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="badge bg-primary-subtle text-primary">Academic</span>
                <span class="text-muted small">2 hours ago</span>
              </div>
              <h6 class="fw-bold mb-1">Grade 10 Chemistry Lab Relocation</h6>
              <p class="text-muted mb-0 small">Please be informed that the Chemistry lab practicals for Grade 10 have been relocated to Room 204 B.</p>
            </div>
            <div class="p-3 border rounded bg-light bg-opacity-25">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="badge bg-success-subtle text-success">Activities</span>
                <span class="text-muted small">Yesterday</span>
              </div>
              <h6 class="fw-bold mb-1">Annual Sports Day Scheduling</h6>
              <p class="text-muted mb-0 small">The planning committee has finalized the schedule for the Annual Sports Day set for July 15th.</p>
            </div>
          </div>
        </DashboardCard>
      </div>

      <div class="col-12 col-lg-6">
        <DashboardCard title="Audit & Activity Logs" subtitle="System events and user login tracking">
          <div class="activity-logs mt-2">
            <div class="d-flex gap-3 mb-3 pb-3 border-bottom align-items-start">
              <div class="rounded-circle bg-success text-white p-2 d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;">
                <i class="bi-check-lg small"></i>
              </div>
              <div>
                <h6 class="mb-0 fw-semibold text-dark small">Attendance logged for Grade 11-A</h6>
                <p class="text-muted mb-0 small" style="font-size: 0.8rem;">By Teacher Jane Smith &bull; 10 mins ago</p>
              </div>
            </div>
            <div class="d-flex gap-3 mb-3 pb-3 border-bottom align-items-start">
              <div class="rounded-circle bg-info text-white p-2 d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;">
                <i class="bi-pencil small"></i>
              </div>
              <div>
                <h6 class="mb-0 fw-semibold text-dark small">Student record updated: "John Doe"</h6>
                <p class="text-muted mb-0 small" style="font-size: 0.8rem;">By Registrar Sarah Jenkins &bull; 45 mins ago</p>
              </div>
            </div>
            <div class="d-flex gap-3 align-items-start">
              <div class="rounded-circle bg-warning text-dark p-2 d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;">
                <i class="bi-exclamation-triangle small"></i>
              </div>
              <div>
                <h6 class="mb-0 fw-semibold text-dark small">Unpaid Tuition alert sent to 14 parents</h6>
                <p class="text-muted mb-0 small" style="font-size: 0.8rem;">By System Automator &bull; 2 hours ago</p>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>

    <!-- Quick Action Modals (Mock UI) -->
    <Modal v-model="activeModal" :title="modalTitle" @close="activeModal = false">
      <p class="text-muted small">This is a Phase 1 mockup form for action: <span class="fw-bold">{{ modalTitle }}</span>.</p>
      <div class="mb-3">
        <label class="form-label">Full Name</label>
        <input type="text" class="form-control" placeholder="e.g. Liam Sterling" />
      </div>
      <div class="mb-3">
        <label class="form-label">Select Grade / Category</label>
        <select class="form-select">
          <option>Grade 9-A</option>
          <option>Grade 10-B</option>
          <option>Grade 11-A</option>
        </select>
      </div>
      <template #footer>
        <Button variant="secondary" @click="activeModal = false">Cancel</Button>
        <Button variant="primary" @click="saveMockAction">Save changes</Button>
      </template>
    </Modal>
  </div>
</template>

<script>
import { ref } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import StatCard from '../components/StatCard.vue';
import DashboardCard from '../components/DashboardCard.vue';
import DataTable from '../components/DataTable.vue';
import Button from '../components/Button.vue';
import Alert from '../components/Alert.vue';
import Avatar from '../components/Avatar.vue';
import Badge from '../components/Badge.vue';
import SearchBar from '../components/SearchBar.vue';
import Modal from '../components/Modal.vue';

export default {
  name: 'Dashboard',
  components: { PageHeader, StatCard, DashboardCard, DataTable, Button, Alert, Avatar, Badge, SearchBar, Modal },
  setup() {
    const loadingData = ref(false);
    const activeModal = ref(false);
    const modalTitle = ref('');

    const studentColumns = [
      { key: 'name', label: 'Student', sortable: true },
      { key: 'idNumber', label: 'ID Number' },
      { key: 'class', label: 'Class' },
      { key: 'status', label: 'Status' }
    ];

    const recentStudents = ref([
      { id: 1, name: 'Liam Sterling', idNumber: 'STU-2026-0041', class: 'Grade 10-A', status: 'Active' },
      { id: 2, name: 'Chloe Vance', idNumber: 'STU-2026-0042', class: 'Grade 9-B', status: 'Active' },
      { id: 3, name: 'Ethan Hunt', idNumber: 'STU-2026-0043', class: 'Grade 11-A', status: 'Pending' },
      { id: 4, name: 'Mia Wong', idNumber: 'STU-2026-0044', class: 'Grade 12-C', status: 'Active' }
    ]);

    // Revenue Chart Mock Values in % representing bar heights
    const revenueChartData = [
      { month: 'Jan', tuition: 70, tuitionVal: '35,000', payroll: 40, payrollVal: '20,000' },
      { month: 'Feb', tuition: 75, tuitionVal: '37,500', payroll: 42, payrollVal: '21,000' },
      { month: 'Mar', tuition: 85, tuitionVal: '42,500', payroll: 45, payrollVal: '22,500' },
      { month: 'Apr', tuition: 80, tuitionVal: '40,000', payroll: 45, payrollVal: '22,500' },
      { month: 'May', tuition: 90, tuitionVal: '45,000', payroll: 48, payrollVal: '24,000' },
      { month: 'Jun', tuition: 95, tuitionVal: '47,500', payroll: 50, payrollVal: '25,000' }
    ];

    const refreshDashboard = () => {
      loadingData.value = true;
      setTimeout(() => {
        loadingData.value = false;
      }, 800);
    };

    const showModal = (type) => {
      if (type === 'enroll') modalTitle.value = 'Quick Enroll Student';
      if (type === 'fee') modalTitle.value = 'Record Student Fee Payment';
      if (type === 'exam') modalTitle.value = 'Input Term Grades';
      activeModal.value = true;
    };

    const saveMockAction = () => {
      activeModal.value = false;
      alert('Success! Action simulated (UI Only).');
    };

    return {
      loadingData,
      activeModal,
      modalTitle,
      studentColumns,
      recentStudents,
      revenueChartData,
      refreshDashboard,
      showModal,
      saveMockAction
    };
  }
}
</script>

<style scoped>
.cursor-pointer-chart {
  cursor: pointer;
}
.cursor-pointer-chart:hover {
  opacity: 0.85;
}
</style>
