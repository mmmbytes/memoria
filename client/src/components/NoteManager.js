import { useState, useEffect } from "react";
import NoteContent from "./NoteContent";
import DeleteButton from "./DeleteButton";

const { fetchLatestNote, updateNote, deleteNote } = require("../api/NoteApi");

function NoteManager() {
	const [note, setNote] = useState({ title: "", textbody: "" });

	const fetchNote = async () => {
		const activeNote = await fetchLatestNote();
		if (activeNote) {
			setNote(activeNote);
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
			console.log(`Note ${deletedNote._id} deleted.`);
			fetchNote();
		} else {
			console.error("Error deleting note.");
		}
	}

	return (
		<div>
			<NoteContent note={note} handleTextChange={handleTextChange} />
			<DeleteButton handleDeleteNote={handleDeleteNote} />
		</div>
	);
}

export default NoteManager;
