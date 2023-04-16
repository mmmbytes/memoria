import { useState, useEffect } from "react";
import NoteDetails from "./NoteDetails";

const { fetchLatestNote, updateNote } = require("../api/activeNoteApi");

function NoteManager() {
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

	return <NoteDetails note={note} handleTextChange={handleTextChange} />;
}

export default NoteManager;
