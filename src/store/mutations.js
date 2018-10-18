import { actionNames } from './actions';

/* eslint-disable no-param-reassign */
const mutations = {
    [actionNames.SIGN_IN](state) {
        state.authenticated = true;
    },
    [actionNames.SIGN_OUT](state) {
        state.authenticated = false;
    },
    [actionNames.SET_USER](state, user) {
        state.user = user;
    },
    [actionNames.UNSET_USER](state) {
        state.user = {};
    },
};
/* eslint-enable no-param-reassign */

export default mutations;
