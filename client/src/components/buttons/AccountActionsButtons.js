import { useNavigate } from 'react-router-dom';

export function SignInButton({ className }) {
	const handleLoginUrl = () => {
		window.location.href = process.env.REACT_APP_LOGIN_URL;
	};

	return (
		<button className={className} onClick={handleLoginUrl}>
			Register / Sign In
		</button>
	);
}

export function SignOutButton({ className }) {
	const navigate = useNavigate();

	// TODO: Add sign out functionality
	const handleSignOutUrl = () => {
		navigate('/welcome');
	};

	return (
		<button className={className} onClick={handleSignOutUrl}>
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
