import { useState, useEffect } from "react";
import NotePreview from "./NotePreview";

import "./NotesCollectionManager.css";

const { getAllNotes } = require("../api/NoteApi");

function NotesCollectionManager() {
	const [notesCollection, setNotesCollection] = useState([]);

	const fetchNotes = async () => {
		const notesData = await getAllNotes();
		if (notesData) {
			setNotesCollection(notesData);
		} else if (notesData === null) {
			console.log("No notes found.");
		} else {
			console.error("Error loading note.");
		}
	};

	useEffect(() => {
		fetchNotes();
	}, []);

	return (
		<div className='notes-collection'>
			<div className='notes-collection__notecards'>
				{notesCollection.map((note) => (
					<NotePreview key={note.id} note={note} />
				))}
			</div>
		</div>
	);
}

export default NotesCollectionManager;
