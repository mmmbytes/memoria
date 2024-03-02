import { useState } from 'react';

// import { getNoteInsights } from '../services/NoteInsights';
// import { cacheIndexedDB, fetchIndexedDB } from '../utils/IndexedDB';
import NoteInsightsIntro from './NoteInsightsIntro';
import NoteInsightsNetwork from './NoteInsightsNetwork';

function NoteInsights() {
	const [view, setView] = useState('intro');
	// const [notesData, setNotesData] = useState(null);

	// useEffect(() => {
	// 	async function fetchCachedData() {
	// 		// const cachedNotesData = await fetchIndexedDB(
	// 		// 	'cachedData',
	// 		// 	'notesData',
	// 		// 	'latestData'
	// 		// );
	// 		// if (cachedNotesData) {
	// 		// 	setNotesData(cachedNotesData);
	// 			setView('network');
	// 		}
	// 	}
	// 	fetchCachedData();
	// }, []);

	async function visualizeNotesData() {
		try {
			// const fetchedData = await getNoteInsights();
			// setNotesData(fetchedData);
			// cacheIndexedDB('cachedData', 'notesData', fetchedData);
			setView('network');
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div>
			{view === 'intro' ? (
				<NoteInsightsIntro visualizeNotesData={visualizeNotesData} />
			) : (
				<NoteInsightsNetwork />
			)}
		</div>
	);
}

export default NoteInsights;
