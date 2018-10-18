import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import getters from './getters';
import actions from './actions';

Vue.use(Vuex);

const initialState = {
    authenticated: false,
    user: {},
};

const store = new Vuex.Store({
    state: initialState,
    getters,
    mutations,
    actions,
});

export default store;
