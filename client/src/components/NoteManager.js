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
		try {
			let activeNote;

			if (noteId) {
				activeNote = await fetchSpecificNote(noteId);
			} else {
				activeNote = await fetchLatestNote();
			}

			if (activeNote.error) {
				throw new Error(activeNote.error);
			} else if (activeNote.status === 204) {
				console.log('No notes in database. Creating new note.');
				handleNewNote();
			} else {
				setNote(activeNote);
			}
		} catch (error) {
			// TODO: Create error handling component that displays error message to user
			console.error(error.message);
		}
	};

	useEffect(() => {
		fetchNote(noteId);
	}, []);

	async function handleTextChange(e) {
		const { name, value } = e.target;
		const editedNote = { ...note, [name]: value };
		setNote(editedNote);
		try {
			const updatedNote = await updateNote(note._id, editedNote);
			if (updatedNote.error) {
				throw new Error(updatedNote.error);
			} else {
				console.log(`Note ${updatedNote._id} updated.`);
			}
		} catch (error) {
			// TODO: Create error handling component that displays error message to user
			console.error(error.message);
		}
	}

	async function handleDeleteNote() {
		try {
			const deletedNote = await deleteNote(note._id);
			if (deletedNote.error) {
				throw new Error(deletedNote.error);
			}
			console.log(`Note ${deletedNote.noteId} deleted.`);
			fetchNote();
		} catch (error) {
			// TODO: Create error handling component that displays error message to user
			console.error(error.message);
		}
	}

	async function handleNewNote() {
		try {
			const newNote = await createNote();
			if (newNote.error) {
				throw new Error('Error creating note.');
			}
			console.log(`Note ${newNote._id} created.`);
			fetchNote();
		} catch (error) {
			// TODO: Create error handling component that displays error message to user
			console.error(error.message);
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
