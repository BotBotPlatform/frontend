import { setCookie, loadCookie, deleteCookie } from '../utils/cookies';
import jwt_decode from 'jwt-decode';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';

export function loginFromJWT (token) {
	setCookie('token', token, {path: '/'});

    return function (dispatch) {

        dispatch(saveToken(token));
    }
}

function saveToken(token) {
	return {
		type: LOGIN_SUCCESS,
		token: token
	}
}

export function logoutUser() {
    return function (dispatch) {
        dispatch({ type: LOGOUT_USER });
        deleteCookie('token', {path: '/'})
    }
}