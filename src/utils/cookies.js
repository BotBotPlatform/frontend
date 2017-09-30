import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (name, val, options) => cookies.set(name, val, options);

export const loadCookie = name => cookies.get(name);

export const deleteCookie = name => cookies.remove(name);