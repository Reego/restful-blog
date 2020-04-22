import {
    LOGIN_USER,
    LOGOUT_USER,
    RECEIVE_CSRF,
} from './actionTypes';

const login = (state, action) => {

};

const logout = (state, action) => {

};

const csrf = (state, action) => {

};

const reducer = (state={}, action) => {

    switch(action.type) {
        case LOGIN_USER:
            return login(state, action);
        case LOGOUT_USER:
            return logout(state, action);
        case RECEIVE_CSRF:
            return csrf(state, action);
    }
    return state;
};

export default reducer;
