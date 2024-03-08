import { deleteAuthCookie } from '../../utils/AccountUtils';

export function SignInButton({ className }) {
	const handleLogin = () => {
		const loginUrl = process.env.REACT_APP_LOGIN_URL;
		console.log('loginUrl', loginUrl);
		window.location.href = loginUrl;
	};

	return (
		<button type="button" className={className} onClick={handleLogin}>
			Register / Sign In
		</button>
	);
}

export function SignOutButton({ className }) {
	const handleLogout = () => {
		deleteAuthCookie();
		const logoutUrl = process.env.REACT_APP_LOGOUT_URL;
		console.log('logoutUrl', logoutUrl);
		window.location.href = logoutUrl;
	};

	return (
		<button type="button" className={className} onClick={handleLogout}>
			Sign Out
		</button>
	);
}
