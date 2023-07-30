const defaultOptions = {
	method: 'GET',
	credentials: 'include',
	headers: { 'Content-Type': 'application/json' },
};

const handleResponse = async (response) => {
	switch (response.status) {
		case 204:
			console.log('No notes in database. Creating new note.');
			return null;
		case 401:
			// TODO: Send json message to login page to display why user is being redirected
			window.location.href = process.env.REACT_APP_LOGIN_URL;
			return null;
		default:
			if (response.ok) {
				return response.json();
			} else {
				const errorData = await response.json();
				let errorMessage = `${response.status}: ${errorData.message}`;
				throw new Error(errorMessage);
			}
	}
};

const apiRequest = async (url, options = {}) => {
	const mergedOptions = { ...defaultOptions, ...options };

	try {
		const response = await fetch(url, mergedOptions);
		return handleResponse(response);
	} catch (error) {
		console.error(error);
		throw new Error(error.message);
	}
};

export const fetchLatestNote = () => {
	return apiRequest('/api/notes/latest');
};

export const fetchSpecificNote = (noteId) => {
	return apiRequest(`/api/notes/${noteId}`);
};

export const fetchAllNotes = () => {
	return apiRequest('/api/notes');
};

export const updateNote = (noteId, updatedNote) => {
	const options = {
		method: 'PUT',
		body: JSON.stringify(updatedNote),
	};
	return apiRequest(`/api/notes/${noteId}`, options);
};

export const deleteNote = (noteId) => {
	const options = {
		method: 'DELETE',
	};
	return apiRequest(`/api/notes/${noteId}`, options);
};

export const createNote = () => {
	const options = {
		method: 'POST',
	};
	return apiRequest('/api/notes', options);
};
