const defaultOptions = {
	method: 'GET',
	headers: { 'Content-Type': 'application/json' },
};

const apiRequest = async (url, options = {}) => {
	const mergedOptions = { ...defaultOptions, ...options };

	try {
		const response = await fetch(url, mergedOptions);
		if (response.status === 204) {
			console.log('No notes in database. Creating new note.');
			return null;
		}

		const responseData = await response.json();
		return responseData;
	} catch (error) {
		console.error('Error in API request.');
		return { error: error.message };
	}
};

export const fetchLatestNote = async () => {
	return apiRequest('/api/notes/latest');
};

export const fetchSpecificNote = async (noteId) => {
	return apiRequest(`/api/notes/${noteId}`);
};

export const fetchAllNotes = async () => {
	return apiRequest('/api/notes');
};

export const updateNote = async (noteId, updatedNote) => {
	const options = {
		method: 'PUT',
		body: JSON.stringify(updatedNote),
	};
	return apiRequest(`/api/notes/${noteId}`, options);
};

export const deleteNote = async (noteId) => {
	const options = {
		method: 'DELETE',
	};
	return apiRequest(`/api/notes/${noteId}`, options);
};

export const createNote = async () => {
	const options = {
		method: 'POST',
	};
	return apiRequest('/api/notes', options);
};
