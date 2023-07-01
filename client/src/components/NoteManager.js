import './NoteManager.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
	createNote,
	deleteNote,
	fetchLatestNote,
	fetchSpecificNote,
	updateNote,
} from '../api/NoteApi';
import DeleteButton from './DeleteButton';
import NewNoteButton from './NewNoteButton';
import NoteContent from './NoteContent';

function NoteManager() {
	const { noteId } = useParams();
	const [note, setNote] = useState({ title: '', textbody: '' });

	const fetchNote = async (noteId) => {
		let activeNote;

		if (noteId) {
			activeNote = await fetchSpecificNote(noteId);
		} else {
			activeNote = await fetchLatestNote();
		}

		if (activeNote) {
			setNote(activeNote);
		} else if (activeNote === null) {
			handleNewNote();
		} else {
			console.error('Error loading note.');
		}
	};

	useEffect(() => {
		fetchNote(noteId);
	}, []);

	async function handleTextChange(e) {
		const { name, value } = e.target;
		const editedNote = { ...note, [name]: value };
		setNote(editedNote);
		const updatedNote = await updateNote(note._id, editedNote);
		if (updatedNote) {
			console.log(`Note ${updatedNote._id} updated.`);
		} else {
			console.error('Error saving note.');
		}
	}

	async function handleDeleteNote() {
		const deletedNote = await deleteNote(note._id);
		if (deletedNote) {
			console.log(`Note ${deletedNote.noteId} deleted.`);
			fetchNote();
		} else {
			console.error('Error deleting note.');
		}
	}

	async function handleNewNote() {
		const newNote = await createNote();
		if (newNote) {
			console.log(`Note ${newNote._id} created.`);
			fetchNote();
		} else {
			console.error('Error creating note.');
		}
	}

	return (
		<div className="workspace">
			<div className="workspace__active-note">
				<NoteContent note={note} handleTextChange={handleTextChange} />
			</div>
			<div className="workspace__btns">
				<DeleteButton handleDeleteNote={handleDeleteNote} />
				<NewNoteButton handleNewNote={handleNewNote} />
			</div>
		</div>
	);
}

export default NoteManager;
