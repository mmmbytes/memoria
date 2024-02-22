import './styles/NoteInsightsNetwork.css';

import NetworkVisualization from '../components/NetworkVisualization';
import { Provider } from '../utils/ReactDims';

function NoteInsightsNetwork({ notesData }) {
	return (
		<div className="note-insights-network">
			<div className="note-insights-network__container">
				<Provider>
					<NetworkVisualization
						nodes={notesData.notesList}
						links={notesData.similarityData}
					/>
				</Provider>
			</div>
		</div>
	);
}

export default NoteInsightsNetwork;
