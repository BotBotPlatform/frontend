import jwtDecode from 'jwt-decode';

import {
    LOGIN_SUCCESS,
    LOGOUT_USER,
    REGISTER_SUCCESS
} from '../actions/users';

const INITIAL_STATE = {
    authenticated: false,
    bot_created: false,
    error: null,
    token: null,
    registered: false
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state,
                authenticated: true,
                error: null,
                token: action.token,
                registered: true
            };
        case REGISTER_SUCCESS:
            return { ...state,
                authenticated: false,
                error: null,
                token: null,
                registered: true
            }
        case LOGOUT_USER:
            return INITIAL_STATE;
        default:
            return state;
    }
}