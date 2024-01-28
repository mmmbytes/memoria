import './styles/NoteInsights.css';

import { useState } from 'react';

import { TestButton } from '../components/buttons/NoteInsightsButtons';
import btnMod from '../sharedStyles/button.module.css';

function NoteInsights() {
	const [testResponse, setTestResponse] = useState('');

	function handleTestResponse(response) {
		setTestResponse(response);
	}

	return (
		<div className="note-insights">
			<header>
				<h1>{"We're Building Something Exciting!"}</h1>
				<p>
					We are hard at work adding new insights to your note experience. Want
					early access? Join our Beta Tester community and be among the first to
					shape the future of Note Insights.
				</p>
				<TestButton
					className={`${btnMod.btn} ${btnMod.btnStyled}`}
					onTestComplete={handleTestResponse}
				/>
				{testResponse && <div>{testResponse}</div>}{' '}
			</header>
		</div>
	);
}

export default NoteInsights;
