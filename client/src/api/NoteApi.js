const defaultOptions = {
	method: "GET",
	headers: { "Content-Type": "application/json" },
};

const apiRequest = async (url, options = {}) => {
	const mergedOptions = { ...defaultOptions, ...options };

	try {
		const response = await fetch(url, mergedOptions);

		if (response.status === 204) {
			console.error("Resource not found.");
			return null;
		}

		const responseData = await response.json();
		return responseData;
	} catch (error) {
		console.error("Error in API request.");
		return { error: error.message };
	}
};

const fetchLatestNote = async () => {
	return apiRequest("/api/notes/latest");
};

const getAllNotes = async () => {
	return apiRequest("/api/notes");
};

const updateNote = async (noteId, updatedNote) => {
	const options = {
		method: "PUT",
		body: JSON.stringify(updatedNote),
	};
	return apiRequest(`/api/notes/${noteId}`, options);
};

const deleteNote = async (noteId) => {
	const options = {
		method: "DELETE",
	};
	return apiRequest(`/api/notes/${noteId}`, options);
};

const createNote = async () => {
	const options = {
		method: "POST",
	};
	return apiRequest("/api/notes", options);
};

module.exports = {
	fetchLatestNote,
	getAllNotes,
	updateNote,
	deleteNote,
	createNote,
};
