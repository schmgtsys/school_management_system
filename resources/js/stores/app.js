import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
        sidebarCollapsed: false,
        theme: localStorage.getItem('theme') || 'light', // light or dark
        language: 'en', // default language
        notifications: [
            { id: 1, title: 'New Student Enrolled', message: 'John Doe enrolled in Grade 10-A', time: '5m ago', read: false },
            { id: 2, title: 'Payroll Generated', message: 'Staff payroll for June has been processed', time: '1h ago', read: false },
            { id: 3, title: 'Exam Schedule Updated', message: 'Mid-term exams updated for Grade 8', time: '3h ago', read: true }
        ],
        messages: [
            { id: 1, sender: 'John Doe (Parent)', message: 'Hello, I wanted to inquire about...', time: '10m ago', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=80' },
            { id: 2, sender: 'Jane Smith (Teacher)', message: 'Grade 9-B attendance has been finalized...', time: '2h ago', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=80' }
        ]
    }),
    actions: {
        toggleSidebar() {
            this.sidebarCollapsed = !this.sidebarCollapsed;
        },
        setSidebarCollapsed(val) {
            this.sidebarCollapsed = val;
        },
        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', this.theme);
            document.documentElement.setAttribute('data-bs-theme', this.theme);
        },
        setLanguage(lang) {
            this.language = lang;
        },
        markNotificationsRead() {
            this.notifications.forEach(n => n.read = true);
        }
    }
});
