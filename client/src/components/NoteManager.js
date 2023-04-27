import { useState, useEffect } from "react";
import NoteContent from "./NoteContent";
import DeleteButton from "./DeleteButton";
import NewNoteButton from "./NewNoteButton";
import "./NoteManager.css";

const {
	fetchLatestNote,
	updateNote,
	deleteNote,
	createNote,
} = require("../api/NoteApi");

function NoteManager() {
	const [note, setNote] = useState({ title: "", textbody: "" });

	const fetchNote = async () => {
		const activeNote = await fetchLatestNote();
		if (activeNote) {
			setNote(activeNote);
		} else if (activeNote === null) {
			handleNewNote();
		} else {
			console.error("Error loading note.");
		}
	};

	useEffect(() => {
		fetchNote();
	}, []);

	async function handleTextChange(e) {
		const { name, value } = e.target;
		const editedNote = { ...note, [name]: value };
		setNote(editedNote);
		const updatedNote = await updateNote(note._id, editedNote);
		if (updatedNote) {
			console.log(`Note ${updatedNote._id} updated.`);
		} else {
			console.error("Error saving note.");
		}
	}

	async function handleDeleteNote() {
		const deletedNote = await deleteNote(note._id);
		if (deletedNote) {
			console.log(`Note ${deletedNote.noteId} deleted.`);
			fetchNote();
		} else {
			console.error("Error deleting note.");
		}
	}

	async function handleNewNote() {
		const newNote = await createNote();
		if (newNote) {
			console.log(`Note ${newNote._id} created.`);
			fetchNote();
		} else {
			console.error("Error creating note.");
		}
	}

	return (
		<div className='workspace'>
			<NoteContent note={note} handleTextChange={handleTextChange} />
			<div className='workspace__btns'>
				<DeleteButton handleDeleteNote={handleDeleteNote} />
				<NewNoteButton handleNewNote={handleNewNote} />
			</div>
		</div>
	);
}

export default NoteManager;
