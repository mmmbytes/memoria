import './styles/ActionsMenu.css';

import { useState } from 'react';

import { ActionsMenuButton } from './Buttons';

function ActionsMenu({ handleNewNote, handleDeleteNote }) {
	const [menuOpen, setMenuOpen] = useState(false);

	const handleToggle = () => {
		setMenuOpen((prev) => !prev);
	};

	return (
		<div className="actions-menu">
			<ActionsMenuButton
				className="actions-menu__toggle-btn"
				onClick={handleToggle}
			/>
			<div
				onClick={handleToggle}
				className={`actions-menu__dropdown ${
					menuOpen ? 'actions-menu__dropdown--visible' : ''
				}`}
			>
				<button className="btn actions-menu__btn" onClick={handleNewNote}>
					New Note
				</button>
				<button className="btn actions-menu__btn" onClick={handleDeleteNote}>
					Delete Note
				</button>
			</div>
		</div>
	);
}

export default ActionsMenu;
