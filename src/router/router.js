import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Auth.vue';
import Profile from '../views/Profile.vue';
import Content from "../components/Content.vue";
import { useAuthStore } from '../store';
import Auth from "../views/Auth.vue";

const routes = [
    { path: '/', component: Login },
    { path: '/profile', component: Profile },
    { path: '/content', component: Content},
    {path: '/login', component: Auth}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.path !== '/' && !authStore.isAuthenticated) {
        next('/');
    } else {
        next();
    }
});

export default router;






