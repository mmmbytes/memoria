import { useState } from 'react';

import { getNoteInsights } from '../services/NoteInsights';
import NoteInsightsIntro from './NoteInsightsIntro';
import NoteInsightsNetwork from './NoteInsightsNetwork';

function NoteInsights() {
	const [view, setView] = useState('intro');
	const [notesData, setNotesData] = useState(null);

	async function visualizeNotesData() {
		try {
			const fetchedData = await getNoteInsights();
			setNotesData(fetchedData);
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
				<NoteInsightsNetwork notesData={notesData} />
			)}
		</div>
	);
}

export default NoteInsights;
