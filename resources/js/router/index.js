import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: () => import('../pages/Dashboard.vue'),
            },
            {
                path: 'students',
                name: 'Students',
                component: () => import('../pages/Students.vue'),
            },
            {
                path: 'teachers',
                name: 'Teachers',
                component: () => import('../pages/Teachers.vue'),
            },
            {
                path: 'staff',
                name: 'Staff',
                component: () => import('../pages/Staff.vue'),
            },
            {
                path: 'departments',
                name: 'Departments',
                component: () => import('../pages/Departments.vue'),
            },
            {
                path: 'academic/classes',
                name: 'Classes',
                component: () => import('../pages/Classes.vue'),
            },
            {
                path: 'academic/subjects',
                name: 'Subjects',
                component: () => import('../pages/Subjects.vue'),
            },
            {
                path: 'academic/attendance',
                name: 'Attendance',
                component: () => import('../pages/Attendance.vue'),
            },
            {
                path: 'academic/examinations',
                name: 'Examinations',
                component: () => import('../pages/Examinations.vue'),
            },
            {
                path: 'academic/grades',
                name: 'Grades',
                component: () => import('../pages/Grades.vue'),
            },
            {
                path: 'fees',
                name: 'FeeManagement',
                component: () => import('../pages/FeeManagement.vue'),
            },
            {
                path: 'payroll',
                name: 'Payroll',
                component: () => import('../pages/Payroll.vue'),
            },
            {
                path: 'library',
                name: 'Library',
                component: () => import('../pages/Library.vue'),
            },
            {
                path: 'reports',
                name: 'Reports',
                component: () => import('../pages/Reports.vue'),
            },
            {
                path: 'settings',
                name: 'Settings',
                component: () => import('../pages/Settings.vue'),
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    }
});

export default router;
