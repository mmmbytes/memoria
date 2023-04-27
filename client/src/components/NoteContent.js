import "./NoteContent.css";

function NoteContent({ note, handleTextChange }) {
	return (
		<div className='note'>
			<input
				type='text'
				className='note__title'
				name='title'
				placeholder='Title'
				autoFocus
				onChange={handleTextChange}
				value={note.title}
			/>
			<textarea
				className='note__body'
				name='textbody'
				placeholder='Begin your writing journey here...'
				onChange={handleTextChange}
				value={note.textbody}
			></textarea>
		</div>
	);
}

export default NoteContent;
