import './styles/DetailsCard.css';

import btnMod from '../sharedStyles/button.module.css';
import { CloseDetailsButton } from './buttons/NoteInsightsButtons';
import { NoteBody, NoteTitle } from './Note';

function DetailsCard({ currentNote, dismissCard }) {
	return (
		<div className="details-card">
			<CloseDetailsButton
				className={`${btnMod.btn} details-card__close-btn`}
				onClick={dismissCard}
			/>
			<NoteTitle title={currentNote?.title} className="details-card__title" />
			<div className="details-card__textbody-container">
				<NoteBody
					textbody={currentNote?.textbody}
					className={'details-card__textbody'}
				/>
			</div>
		</div>
	);
}

export default DetailsCard;
