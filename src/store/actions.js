export const actionNames = {
    SIGN_IN: 'signIn',
    SIGN_OUT: 'signOut',
    SET_USER: 'setUser',
    UNSET_USER: 'unsetUser',
};

const actions = {
    [actionNames.SIGN_IN]: ({ commit }) => commit(actionNames.SIGN_IN),
    [actionNames.SIGN_OUT]: ({ commit }) => commit(actionNames.SIGN_OUT),
    [actionNames.SET_USER]: ({ commit }, user) => commit(actionNames.SET_USER, user),
    [actionNames.UNSET_USER]: ({ commit }) => commit(actionNames.UNSET_USER),
};

export default actions;
