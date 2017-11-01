import { setCookie, loadCookie, deleteCookie } from '../utils/cookies';
import jwt_decode from 'jwt-decode';
import apiService from './index.js';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const ACCESS_SUCCESS = 'ACCESS_SUCCESS';

export function loginFromJWT (token) {
	setCookie('token', token, {path: '/'});
    return saveToken(token);
}

function saveToken(token) {
	return {
		type: LOGIN_SUCCESS,
		token: token
	}
}

export function registerUser(token) {
    return function (dispatch) {
        dispatch({type: REGISTER_SUCCESS});
        setCookie('token', token, {path: '/'});
    }
}

export function registerAccessToken() {
    return function (dispatch) {
        dispatch({type: ACCESS_SUCCESS});
    }
}

export function logoutUser() {
    return function (dispatch) {
        deleteCookie('token', {path: '/'})
        dispatch({ type: LOGOUT_USER });
    }
}
