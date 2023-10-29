import './styles/NoteContent.css';

function NoteContent({ note, handleTextChange }) {
	return (
		<div className="note">
			<input
				type="text"
				className="note__title"
				name="title"
				placeholder="Title"
				onChange={handleTextChange}
				value={note.title || ''}
			/>
			<div className="note__body-container">
				<textarea
					className="note__body"
					name="textbody"
					placeholder="Begin your writing journey here..."
					onChange={handleTextChange}
					value={note.textbody || ''}
				></textarea>
			</div>
		</div>
	);
}

export default NoteContent;
