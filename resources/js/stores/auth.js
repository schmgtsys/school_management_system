import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {
            name: 'Sarah Jenkins',
            email: 'sarah.jenkins@academic.edu',
            role: 'Super Admin',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
        },
        token: localStorage.getItem('token') || 'dummy-token', // Dummy token for UI Phase 1
        permissions: ['all']
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        setToken(token) {
            this.token = token;
            localStorage.setItem('token', token);
        },
        clearAuth() {
            this.token = null;
            localStorage.removeItem('token');
        }
    }
});
