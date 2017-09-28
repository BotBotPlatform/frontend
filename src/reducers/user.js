import jwtDecode from 'jwt-decode';

import {
    LOGIN_FROM_JWT_SUCCESS,
    LOGOUT_USER
} from '../actions/users';

const INITIAL_STATE = {
    authenticated: false,
    me: null,
    error: null,
    token: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case LOGIN_FROM_JWT_SUCCESS:
            return { ...state,
                authenticated: true,
                error: null,
                loading: false,
                token: action.token
            };
        case LOGOUT_USER:
            return INITIAL_STATE;
        default:
            return state;
    }
}