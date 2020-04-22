import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { apiCall } from '../common/api';
import { loginUser, logoutUser } from './actions';

import AwaitingLogin from './awaitingLogin';

const authApiPath = process.env.REACT_APP_API_URL + process.env.REACT_APP_AUTH_PATH;
const loginApiPath = authApiPath + 'login/';
const logoutApiPath = authApiPath + 'logout/';

const tryLogin = (username, password, csrfToken) => {

    return apiCall(loginApiPath, {
        credentials: 'include',
        body: {
            csrfmiddlewaretoken: csrfToken,
            username,
            password,
        },
        headers: {
            'X-CSRFTOKEN': csrfToken,
        },
    });
};

const logout = (dispatch, csrfToken) => {
    return fetch(logoutApiPath, {
        credentials: 'include',
        headers: {
            'X-CSRFTOKEN': csrfToken,
        },
    });
};

const requestCsrf = () => {

};

const WithAuthenticationComponent = ({ children }) => {

    const user = useSelector(state => state.user);
    const csrfToken = useSelector(state => state.csrfToken);

    const dispatch = useDispatch();

    if(user == null) {
        const _user = tryLogin()
            .then(_user => {
                if(_user != null) {

                    // logins user
                    dispatch(loginUser());
                }
                throw 'Invalid User';
            })
            .catch(err => {
                return <Redirect to='/500'/>
            });
        // Renders Loading Screen
        return <AwaitingLogin/>
    }
    else if(csrfToken == null) {
        const _csrfToken = requestCsrf();
        return <AwaitingLogin/>
    }
    return <React.Fragment>{ children }</React.Fragment>
};

const withAuthentication = ({ children }) => (
    <WithAuthenticationComponent>
        { children }
    </WithAuthenticationComponent>
);

export {
    tryLogin,
    logout,
    apiCall,
    withAuthentication,
};
