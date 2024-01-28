import './styles/NotePreview.css';

import { useNavigate } from 'react-router-dom';

function NotePreview({ note }) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/note/${note._id}`);
	};

	return (
		<div className="note-preview" onClick={handleClick}>
			<h2 className="note-preview__title">{note.title}</h2>
			<p className="note-preview__textbody">{note.textbody}</p>
		</div>
	);
}

export default NotePreview;
