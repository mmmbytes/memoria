import { useState, useEffect } from "react";
import "./ActiveNote.css";

const { fetchLatestNote } = require("../api/activeNoteApi");

function ActiveNote() {
	const [note, setNote] = useState({ title: "", textbody: "" });

	useEffect(() => {
		const fetchNote = async () => {
			const activeNote = await fetchLatestNote();
			if (activeNote) {
				setNote(activeNote);
			} else {
				console.error("Error loading note.");
			}
		};
		fetchNote();
	}, []);

	function handleTextChange(e) {
		const { name, value } = e.target;
		setNote({ ...note, [name]: value });
	}

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

export default ActiveNote;
