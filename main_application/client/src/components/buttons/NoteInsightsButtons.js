import * as NoteInsightsService from '../../services/NoteInsights';

export function NoteInsightsButton({ className }) {
	function visualizeNotesData() {
		(async () => {
			try {
				const notesData = await NoteInsightsService.getNoteInsights();
				console.log(notesData);
			} catch (error) {
				console.error(error);
			}
		})();
	}

	return (
		<button type="button" className={className} onClick={visualizeNotesData}>
			Note Insights
		</button>
	);
}
