import jwtDecode from 'jwt-decode';

import {
    LOGIN_SUCCESS,
    LOGOUT_USER
} from '../actions/users';

const INITIAL_STATE = {
    authenticated: false,
    bot_created: false,
    error: null,
    token: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state,
                authenticated: true,
                error: null,
                token: action.token
            };
        case LOGOUT_USER:
            return INITIAL_STATE;
        default:
            return state;
    }
}