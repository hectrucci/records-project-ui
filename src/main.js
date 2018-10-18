// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// vendor css
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// vendor js
import Vue from 'vue';
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';
import VueSwal from 'vue-swal';

// app js
import store from './store/store';
import App from './App';
import router from './router';
import interceptors from './helpers/interceptors';

// load ajax interceptors
interceptors();

// load plugins
Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(VueSwal);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>',
});
