import "./NotePreview.css";

function NotePreview({ note }) {
	return (
		<div className='note-preview'>
			<h2 className='note-preview__title'>{note.title}</h2>
			<p className='note-preview__textbody'>{note.textbody}</p>
		</div>
	);
}

export default NotePreview;
