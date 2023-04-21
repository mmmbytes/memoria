const fetchLatestNote = async () => {
	try {
		const response = await fetch("/api/notes/latest");

		if (response.status === 204) {
			console.error("Notes collection is empty.");
			return null;
		}

		const latestNote = await response.json();
		return latestNote;
	} catch (error) {
		console.error("Error loading note.");
		return { error: error.message };
	}
};

const updateNote = async (noteId, updatedNote) => {
	try {
		const response = await fetch(`/api/notes/${noteId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedNote),
		});
		const responseData = await response.json();
		return responseData;
	} catch (error) {
		console.error("Error saving note.");
		return null;
	}
};

const deleteNote = async (noteId) => {
	try {
		const response = await fetch(`/api/notes/${noteId}`, {
			method: "DELETE",
		});
		const responseData = await response.json();
		return responseData;
	} catch (error) {
		console.error("Error deleting note.");
		return null;
	}
};

const createNote = async () => {
	try {
		const response = await fetch("/api/notes", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const responseData = await response.json();
		return responseData;
	} catch (error) {
		console.error("Error creating note.");
		return null;
	}
};

module.exports = {
	fetchLatestNote,
	updateNote,
	deleteNote,
	createNote,
};
