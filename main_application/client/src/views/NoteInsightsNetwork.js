import './styles/NoteInsightsNetwork.css';

import { useState } from 'react';

import NetworkVisualization from '../components/NetworkVisualization';
import { NoteBody, NoteTitle } from '../components/Note';
import { Provider } from '../utils/ReactDims';

function NoteInsightsNetwork() {
	const nodes = [
		{
			id: '65c6b1ee2dc5ff88ada88979',
			title: 'Neruda',
			textbody:
				'Out of lemon flowers\nloosed\non the moonlight, love of the rind,\nthe proportions, arcane and acerb. We open\nthe halves\nof a miracle, and a clotting of acids\nbrims\ninto the starry divisions: creation’s\noriginal juices, irreducible, changeless,\nalive:\nso the freshness lives on\nin a lemon, in the sweet-smelling house of the rind,\nthe proportions, arcane and acerb.',
		},
		{
			id: '65c6b2352dc5ff88ada8898b',
			title: 'Watts',
			textbody:
				'The only way to make sense out of change is to plunge into it, move with it, and join the dance.',
		},
		{
			id: '65c6b2912dc5ff88ada88996',
			title: 'Rumi',
			textbody:
				'If anyone asks you\nhow the perfect satisfaction\nof…the edge\nof the door to surprise us\n\nLike this.\n\n',
		},
	];

	const links = [
		{
			source: '65c6b1ee2dc5ff88ada88979',
			target: '65c6b2352dc5ff88ada8898b',
			value: 0.631,
		},
		{
			source: '65c6b1ee2dc5ff88ada88979',
			target: '65c6b2912dc5ff88ada88996',
			value: 0.115,
		},
		{
			source: '65c6b2352dc5ff88ada8898b',
			target: '65c6b2912dc5ff88ada88996',
			value: 0.361,
		},
	];

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
						? 'note-insights-network__svg-layout--detailed-view'
						: 'note-insights-network__svg-layout'
				}
			>
				<div className="note-insights-network__svg-container">
					<Provider>
						<NetworkVisualization
							nodes={nodes}
							links={links}
							onNodeClick={handleNodeClick}
						/>
					</Provider>
				</div>
			</div>
			{isDetailedViewVisible && (
				<div className="note-insights-network__note-details">
					<NoteTitle
						title={currentNote?.title}
						className="note-insights-network__title"
					/>
					<div className="note-insights-network__textbody-container">
						<NoteBody
							textbody={currentNote?.textbody}
							className={'note-insights-network__textbody'}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default NoteInsightsNetwork;
