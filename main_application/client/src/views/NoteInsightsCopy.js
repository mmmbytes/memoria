import './styles/NoteInsights.css';

import { useState } from 'react';

import { NoteInsightsButton } from '../components/buttons/NoteInsightsButtons';
import { NetworkVisualization } from '../components/NetworkVisualization';
import { getNoteInsights } from '../services/NoteInsights';
import btnMod from '../sharedStyles/button.module.css';

function NoteInsights() {
	// const [notesData, setNotesData] = useState(null);
	const [view, setView] = useState('default');

	async function visualizeNotesData() {
		try {
			setView('network');
			// const fetchedData = await getNoteInsights();
			// setNotesData(fetchedData);
			// setView('network');
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="note-insights">
			<div
				className={`${
					view === 'network'
						? 'note-insights__heading--network-view'
						: 'note-insights__heading'
				}`}
			>
				<h1
					className={`note-insights__title ${
						view === 'network' ? 'note-insights__title--network-view' : ''
					}`}
				>
					{'Discover the hidden networks within your thoughts.'}
				</h1>
				<div
					className={`"note-insights__btn" ${
						view === 'network' ? 'note-insights__btn--network-view' : ''
					}`}
				>
					<NoteInsightsButton
						className={`${btnMod.btn} ${btnMod.btnStyled} ${btnMod.btnMisc} note-insights__btn`}
						onClick={visualizeNotesData}
					/>
				</div>
			</div>
			<div
				className={`${
					view === 'network'
						? 'note-insights__network--network-view'
						: 'note-insights__network'
				}`}
			>
				{view === 'network' && (
					<NetworkVisualization
					// nodes={notesData.notesList}
					// links={notesData.similarityData}
					/>
				)}
			</div>
		</div>
	);
}

export default NoteInsights;
