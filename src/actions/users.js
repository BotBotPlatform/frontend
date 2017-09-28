import jwt_decode from 'jwt-decode';

export const LOGIN_FROM_JWT_SUCCESS = 'LOGIN_FROM_JWT_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';

export function loginFromJWT (token) {
    return (dispatch) => {
        dispatch(saveToken(token));
    }
}

function saveToken(token) {
}

export function logoutUser() {
    return function (dispatch) {
        dispatch({ type: LOGOUT_USER });
    }
}