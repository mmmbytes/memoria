const apiRequest = async (url, options = {}) => {
	try {
		const response = await fetch(url, options);

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
	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};
	return apiRequest("/api/notes/latest", options);
};

const updateNote = async (noteId, updatedNote) => {
	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updatedNote),
	};
	return apiRequest(`/api/notes/${noteId}`, options);
};

const deleteNote = async (noteId) => {
	const options = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	};
	return apiRequest(`/api/notes/${noteId}`, options);
};

const createNote = async () => {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	};
	return apiRequest("/api/notes", options);
};

module.exports = {
	fetchLatestNote,
	updateNote,
	deleteNote,
	createNote,
};
