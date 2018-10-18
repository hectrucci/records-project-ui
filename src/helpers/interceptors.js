import axios from 'axios';
import AuthenticationService, { Status } from '@/services/AuthenticationService';

export default () => {
    axios.interceptors.response.use(res => res, (error) => {
        // If status code is 401, call the auth service and log out.
        if (error.response.status === Status.UNAUTHORIZED.code) {
            return AuthenticationService.logOut().then(() => Promise.reject(error));
        }

        // if not, just reject the flow.
        return Promise.reject(error);
    });
};
