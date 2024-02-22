import './styles/NoteInsightsIntro.css';

import { NoteInsightsButton } from '../components/buttons/NoteInsightsButtons';
import btnMod from '../sharedStyles/button.module.css';

function NoteInsightsIntro({ visualizeNotesData }) {
	return (
		<div className="note-insights-intro">
			<h1 className="note-insights-intro__heading">
				{'Discover the hidden networks within your thoughts.'}
			</h1>
			<div>
				<NoteInsightsButton
					className={`${btnMod.btn} ${btnMod.btnStyled} ${btnMod.btnMisc}`}
					onClick={visualizeNotesData}
				/>
			</div>
		</div>
	);
}

export default NoteInsightsIntro;
