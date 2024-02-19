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
			<div className="note-insights__heading">
				<h1 className="note-insights__title">
					{'Discover the hidden networks within your thoughts.'}
				</h1>
				<div className="note-insights__btn">
					<NoteInsightsButton
						className={`${btnMod.btn} ${btnMod.btnStyled} ${btnMod.btnMisc} note-insights__btn`}
						onClick={visualizeNotesData}
					/>
				</div>
			</div>
			<div className="note-insights__network">
				{notesData && (
					<NetworkVisualization
						nodes={notesData.notesList}
						links={notesData.similarityData}
					/>
				)}
			</div>
		</div>
	);
}

export default NoteInsights;
