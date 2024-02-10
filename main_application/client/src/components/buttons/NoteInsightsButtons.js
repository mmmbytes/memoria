import * as NoteInsightsService from '../../services/NoteInsightsService';

export function NoteInsightsButton({ className, onTestComplete }) {
	function handleTest() {
		NoteInsightsService.getInsightsData()
			.then((res) => {
				onTestComplete(res.noteSimilarities);
			})
			.catch((error) => {
				console.error(error);
				onTestComplete(`Error: ${error.message}`);
			});
	}

	return (
		<button type="button" className={className} onClick={handleTest}>
			Note Insights
		</button>
	);
}
