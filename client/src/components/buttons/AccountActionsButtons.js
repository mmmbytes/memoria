import { deleteAuthCookie } from '../../utils/AccountUtils';

export function SignInButton({ className }) {
	const handleLogin = () => {
		const loginUrl = process.env.REACT_APP_LOGIN_URL;
		window.location.href = loginUrl;
	};

	return (
		<button type="button" className={className} onClick={handleLogin}>
			Register / Sign In
		</button>
	);
}

export function SignOutButton({ className }) {
	deleteAuthCookie();

	const handleLogout = () => {
		const logoutUrl = process.env.REACT_APP_LOGOUT_URL;
		window.location.href = logoutUrl;
	};

	return (
		<button type="button" className={className} onClick={handleLogout}>
			Sign Out
		</button>
	);
}
