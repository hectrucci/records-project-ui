import axios from 'axios';
import store from '@/store/store';
import { actionNames } from '@/store/actions';
import router, { routes } from '@/router/';

export const Status = {
    UNAUTHORIZED: {
        code: 401,
        value: 'Unauthorized',
    },
};

const apiUrl = process.env.apiUrl;
const AuthenticationService = {};

AuthenticationService.authenticate = ({ username, password }) => (
    axios({
        method: 'post',
        url: `${apiUrl}/authenticate`,
        data: {
            username,
            password,
        },
    }).then(({ data }) => {
        const { user } = data;
        // sets jwt data and username to localStorage
        window.localStorage.setItem('auth', data.token);
        window.localStorage.setItem('username', user.username);

        // sets the headers for all the upcoming requests
        axios.defaults.headers.common.Authorization = `JWT ${data.token}`;

        // sets the user and sign in flag in the vuex store
        store.dispatch(actionNames.SET_USER, { name: user.username });
        store.dispatch(actionNames.SIGN_IN);

        return Promise.resolve(user);
    })
);

AuthenticationService.logOut = () => {
    // sets jwt data to localStorage and the headers for all the upcoming requests
    window.localStorage.setItem('auth', '');
    window.localStorage.setItem('username', '');
    delete axios.defaults.headers.common.Authorization;

    // unsets the user and sign in flag in the vuex store
    store.dispatch(actionNames.SIGN_OUT);
    store.dispatch(actionNames.UNSET_USER);
    router.push({ name: routes.HOME });

    return Promise.resolve();
};

// If the session has expired, display a warning
AuthenticationService.handleUnauthorizedResponse = ({ response }, swal) => {
    if (response.status === Status.UNAUTHORIZED.code) {
        swal(
            'Sorry',
            'Your session has expired',
            'error',
        );
    }
};

AuthenticationService.checkLocalAuthentication = () => {
    const authToken = window.localStorage.getItem('auth');
    const username = window.localStorage.getItem('username');

    /**
     * if we have the authToken and the username saved in localStorage
     * and is not authenticated, set the auth token  in the headers
     */
    if (authToken && username && !store.getters.isAuthenticated) {
        axios.defaults.headers.common.Authorization = `JWT ${authToken}`;

        store.dispatch(actionNames.SET_USER, { name: username });
        store.dispatch(actionNames.SIGN_IN);
    }
};


export default AuthenticationService;
