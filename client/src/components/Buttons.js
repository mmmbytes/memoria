import { IoEllipsisHorizontalOutline } from 'react-icons/io5';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { VscNewFile } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';

export function ActionsMenuButton({ className, onClick }) {
	return (
		<button className={className} onClick={onClick}>
			<IoEllipsisHorizontalOutline />
		</button>
	);
}

export function DeleteButton({ className, handleDeleteNote }) {
	return (
		<button className={className} onClick={handleDeleteNote}>
			<RiDeleteBin2Line />
		</button>
	);
}

export function NewNoteButton({ handleNewNote }) {
	return (
		<button onClick={handleNewNote}>
			<VscNewFile />
		</button>
	);
}

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

	const handleSignOutUrl = () => {
		navigate('/welcome');
	};

	return (
		<button className={className} onClick={handleSignOutUrl}>
			Sign Out
		</button>
	);
}

export function DeleteAccountButton({ className }) {
	const navigate = useNavigate();

	const handleSignOutUrl = () => {
		navigate('/welcome');
	};

	return (
		<button className={className} onClick={handleSignOutUrl}>
			Delete Account
		</button>
	);
}
