import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        profile: null,
    }),
    actions: {
        async login({ access_token, refresh_token }) {
            this.accessToken = access_token;
            this.refreshToken = refresh_token;
            this.isAuthenticated = !!access_token;

            axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

            // Для отладки
            console.log('Login successful:', {
                accessToken: this.accessToken,
                refreshToken: this.refreshToken,
                isAuthenticated: this.isAuthenticated,
            });
        },
        logout() {
            this.accessToken = null;
            this.refreshToken = null;
            this.isAuthenticated = false;
            this.profile = null;
            delete axios.defaults.headers.common['Authorization'];
        },
        async fetchProfile() {
            try {
                // Получаем доступ к глобальному состоянию Pinia для получения baseURL
                const globalStore = this.$pinia.store.value.global;
                const response = await axios.get(`${globalStore.baseURL}/auth/profile`);
                this.profile = response.data;
            } catch (error) {
                console.error('Failed to fetch profile', error);
            }
        },
    },
});

export const useGlobalStore = defineStore('global', {
    state: () => ({
        baseURL: 'http://app.kibrito.com:8054'
    }),
});
