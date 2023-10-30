import { useNavigate } from 'react-router-dom';

export function SignInButton({ className }) {
	const handleLogin = () => {
		window.location.href = process.env.REACT_APP_LOGIN_URL;
	};

	return (
		<button className={className} onClick={handleLogin}>
			Register / Sign In
		</button>
	);
}

export function SignOutButton({ className }) {
	// TODO: Add sign out functionality
	const handleLogOut = () => {
		const logOutUrl = process.env.REACT_APP_LOGOUT_URL;
		window.location.assign(logOutUrl);
	};

	return (
		<button className={className} onClick={handleLogOut}>
			Sign Out
		</button>
	);
}

export function DeleteAccountButton({ className, id }) {
	const navigate = useNavigate();

	// TODO: Add delete account functionality
	const handleDeleteAccount = () => {
		navigate('/welcome');
	};

	return (
		<button className={className} id={id} onClick={handleDeleteAccount}>
			Delete Account
		</button>
	);
}
