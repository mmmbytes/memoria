import './styles/NoteInsights.css';

import { useState } from 'react';

import { NoteInsightsButton } from '../components/buttons/NoteInsightsButtons';
import { NetworkVisualization } from '../components/NetworkVisualization';
import { getNoteInsights } from '../services/NoteInsights';
import btnMod from '../sharedStyles/button.module.css';

function NoteInsights() {
	const [notesData, setNotesData] = useState(null);

	async function visualizeNotesData() {
		try {
			const fetchedData = await getNoteInsights();
			setNotesData(fetchedData);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="note-insights">
			<header>
				<h1>{'Note Insights'}</h1>
				<NoteInsightsButton
					className={`${btnMod.btn} ${btnMod.btnStyled}`}
					onClick={visualizeNotesData}
				/>
			</header>
			{notesData && (
				<NetworkVisualization
					nodes={notesData.notesList}
					links={notesData.similarityData}
				/>
			)}
		</div>
	);
}

export default NoteInsights;
