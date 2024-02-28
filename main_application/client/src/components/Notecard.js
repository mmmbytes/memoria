import './styles/NotePreview.css';

import { useNavigate } from 'react-router-dom';

function Notecard({ note }) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/note/${note._id}`);
	};

	return (
		<div className="notecard" onClick={handleClick}>
			<h2 className="notecard__title">{note.title}</h2>
			<p className="notecard__textbody">{note.textbody}</p>
		</div>
	);
}

export default Notecard;
