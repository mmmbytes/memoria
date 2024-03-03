import './styles/NoteInsightsIntro.css';

import { RevealInsightsButton } from '../components/buttons/NoteInsightsButtons';
import btnMod from '../sharedStyles/button.module.css';

function NoteInsightsIntro({ loading, visualizeNotesData }) {
	return (
		<div className="note-insights-intro">
			<h1 className="note-insights-intro__heading">
				{'Discover the hidden networks within your thoughts.'}
			</h1>
			<div>
				<RevealInsightsButton
					className={`${btnMod.btn} ${btnMod.btnStyled} ${btnMod.btnMisc} ${
						loading ? 'loading' : ''
					}`}
					onClick={visualizeNotesData}
					loading={loading}
				/>
			</div>
		</div>
	);
}

export default NoteInsightsIntro;
