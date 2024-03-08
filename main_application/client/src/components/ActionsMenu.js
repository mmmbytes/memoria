import './styles/ActionsMenu.css';

import { useState } from 'react';

import btnMod from '../sharedStyles/button.module.css';
import {
	DeleteNoteButton,
	NewNoteButton,
	NoteActionsButton,
} from './buttons/NoteActionsButtons';

function ActionsMenu({ handleNewNote, handleDeleteNote }) {
	const [menuOpen, setMenuOpen] = useState(false);

	const handleToggle = () => {
		setMenuOpen((prev) => !prev);
	};

	return (
		<div className="actions-menu">
			<NoteActionsButton
				className={`${btnMod.btn} actions-menu__toggle-btn`}
				onClick={handleToggle}
			/>
			<div
				onClick={handleToggle}
				className={`actions-menu__dropdown ${
					menuOpen ? 'actions-menu__dropdown--visible' : ''
				}`}
			>
				<NewNoteButton
					className={`${btnMod.btn} ${btnMod.btnStyled} actions-menu__btn`}
					onClick={handleNewNote}
				/>
				<DeleteNoteButton
					className={`${btnMod.btn} ${btnMod.btnStyled} actions-menu__btn`}
					onClick={handleDeleteNote}
				/>
			</div>
		</div>
	);
}

export default ActionsMenu;
