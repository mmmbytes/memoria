import "./NoteDetails.css";

function NoteDetails({ note, handleTextChange }) {
	return (
		<div className='note-main'>
			<div className='note-edit'>
				<input
					type='text'
					id='note-title'
					name='title'
					placeholder='Title'
					autoFocus
					onChange={handleTextChange}
					value={note.title}
				/>
				<textarea
					id='note-body'
					name='textbody'
					placeholder='Begin your writing journey here...'
					onChange={handleTextChange}
					value={note.textbody}
				></textarea>
			</div>
		</div>
	);
}

export default NoteDetails;
