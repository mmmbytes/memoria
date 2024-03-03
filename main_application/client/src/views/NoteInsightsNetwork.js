import './styles/NoteInsightsNetwork.css';

import { useState } from 'react';

import DetailsCard from '../components/DetailsCard';
import NetworkVisualization from '../components/NetworkVisualization';
import { Provider } from '../utils/ReactDims';

function NoteInsightsNetwork({ notesData }) {
	const [currentNote, setCurrentNote] = useState(null);
	const [isDetailedViewVisible, setIsDetailedViewVisible] = useState(false);

	const handleNodeClick = (note) => {
		setCurrentNote(note);
		setIsDetailedViewVisible(true);
	};

	const closeDetailsView = () => {
		setIsDetailedViewVisible(false);
	};

	return (
		<div className="note-insights-network">
			<div
				className={
					isDetailedViewVisible
						? 'note-insights-network__svg-layout--detailed-view'
						: 'note-insights-network__svg-layout'
				}
			>
				<div className="note-insights-network__svg-container">
					<Provider>
						<NetworkVisualization
							nodes={notesData.notesList}
							links={notesData.similarityData}
							onNodeClick={handleNodeClick}
						/>
					</Provider>
				</div>
			</div>
			{isDetailedViewVisible && (
				<DetailsCard
					currentNote={currentNote}
					dismissCard={closeDetailsView}
				></DetailsCard>
			)}
		</div>
	);
}

export default NoteInsightsNetwork;
