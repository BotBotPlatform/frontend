import { setCookie, loadCookie, deleteCookie } from '../utils/cookies';
import jwt_decode from 'jwt-decode';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export function loginFromJWT (token) {
    console.log(token);
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

export function logoutUser() {
    return function (dispatch) {
        dispatch({ type: LOGOUT_USER });
        deleteCookie('token', {path: '/'})
    }
}
