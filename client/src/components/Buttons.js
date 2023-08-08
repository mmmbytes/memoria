import { RiDeleteBin2Line } from 'react-icons/ri';
import { VscNewFile } from 'react-icons/vsc';

export function DeleteButton({ handleDeleteNote }) {
	return (
		<button onClick={handleDeleteNote}>
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
	const loginUrl = () => {
		window.location.href = process.env.REACT_APP_LOGIN_URL;
	};

	return (
		<button className={className} onClick={loginUrl}>
			Register / Sign In
		</button>
	);
}
