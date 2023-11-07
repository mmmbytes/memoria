import { apiRequest } from '../utils/ApiUtils';

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

export const deleteAllNotes = () => {
	const options = {
		method: 'DELETE',
	};
	return apiRequest('/api/notes', options);
};

export const createNote = () => {
	const options = {
		method: 'POST',
	};
	return apiRequest('/api/notes', options);
};
