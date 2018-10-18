import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home/Home';
import Records from '@/components/records/Records';
import store from '@/store/store';
import AuthenticationService from '@/services/AuthenticationService';

Vue.use(Router);

export const routes = {
    HOME: 'Home',
    RECORDS: 'Records',
};

// Checks if a given route is needs authentication, if not it will redirect to the home route
const isAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        return next();
    }
    return next({ name: routes.HOME });
};

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: routes.HOME,
            component: Home,
        },
        {
            path: '/records',
            name: routes.RECORDS,
            component: Records,
            beforeEnter: isAuthenticated,
        },
    ],
});

router.beforeEach((to, from, next) => {
    AuthenticationService.checkLocalAuthentication();
    next();
});

export default router;
