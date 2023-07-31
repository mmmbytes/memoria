import './NotesCollectionManager.css';

import { useEffect, useState } from 'react';

import { fetchAllNotes } from '../api/NoteApi';
import NotePreview from './NotePreview';

function NotesCollectionManager() {
	const [notesCollection, setNotesCollection] = useState([]);

	const fetchNotes = async () => {
		const notesData = await fetchAllNotes();
		if (notesData.error) {
			console.error('Error loading note.');
		} else if (notesData.statusCode === 204) {
			console.log('No notes found.');
		} else {
			setNotesCollection(notesData);
		}
	};

	useEffect(() => {
		fetchNotes();
	}, []);

	return (
		<div className="notes-collection">
			<div className="notes-collection__notecards">
				{notesCollection.map((note) => (
					<NotePreview key={note._id} note={note} />
				))}
			</div>
		</div>
	);
}

export default NotesCollectionManager;
