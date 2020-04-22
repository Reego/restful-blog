import {
    LOGIN_USER,
    LOGOUT_USER,
    RECEIVE_CSRF,
} from './actionTypes';

const loginUser = () => ({
    type: LOGIN_USER,
});

const logoutUser = () => ({
    type: LOGOUT_USER,
});

const receiveCsrf = () => ({
    type: RECEIVE_CSRF
});

export {
    loginUser,
    logoutUser,
    receiveCsrf,
};
