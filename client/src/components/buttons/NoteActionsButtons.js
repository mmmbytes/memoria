import { IoEllipsisHorizontalOutline } from 'react-icons/io5';

/* TODO: Refactor to import the correct API functions and attach them to 
the buttons (dependent on API service refactoring) */
export function NoteActionsButton({ className, onClick }) {
	return (
		<button className={className} onClick={onClick}>
			<IoEllipsisHorizontalOutline />
		</button>
	);
}

export function NewNoteButton({ className, onClick }) {
	return (
		<button className={className} onClick={onClick}>
			New Note
		</button>
	);
}

export function DeleteNoteButton({ className, onClick }) {
	return (
		<button className={className} onClick={onClick}>
			Delete Note
		</button>
	);
}
