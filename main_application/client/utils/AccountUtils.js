import { AUTH_COOKIE_NAME } from '../constants/constants';

export function deleteAuthCookie() {
	document.cookie = `${AUTH_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}
