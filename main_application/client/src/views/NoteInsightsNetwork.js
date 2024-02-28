import './styles/NoteInsightsNetwork.css';

import { useState } from 'react';

import NetworkVisualization from '../components/NetworkVisualization';
import { NoteBody, NoteTitle } from '../components/Note';
import { Provider } from '../utils/ReactDims';

function NoteInsightsNetwork({ notesData }) {
	const [currentNote, setCurrentNote] = useState(null);
	const [isDetailedViewVisible, setIsDetailedViewVisible] = useState(false);

	const handleNodeClick = (note) => {
		console.log(note);
		setCurrentNote(note);
		setIsDetailedViewVisible(true);
	};

	return (
		<div className="note-insights-network">
			<div
				className={
					isDetailedViewVisible
						? 'note-insights-network__container--detailed-view'
						: 'note-insights-network__container'
				}
			>
				<NoteTitle
					title={currentNote?.title}
					className="note-insights-network__title"
				/>
				<Provider>
					<NetworkVisualization
						nodes={notesData.notesList}
						links={notesData.similarityData}
						onNodeClick={handleNodeClick}
					/>
				</Provider>
			</div>
			<NoteBody
				textbody={currentNote?.textbody}
				className={'note-insights-network__textbody'}
			/>
		</div>
	);
}

export default NoteInsightsNetwork;
