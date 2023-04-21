const fetchLatestNote = async () => {
	try {
		const response = await fetch("/api/notes/latest");
		const latestNote = await response.json();

		return latestNote;
	} catch (error) {
		console.error("Error loading note.");
		return null;
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

module.exports = {
	fetchLatestNote,
	updateNote,
	deleteNote,
};
