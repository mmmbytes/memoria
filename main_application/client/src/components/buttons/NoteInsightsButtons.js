import { getInsightsData } from '../../services/NoteInsights';

export function TestButton({ className, onTestComplete }) {
	function handleTest() {
		getInsightsData()
			.then((res) => {
				onTestComplete(res.message);
			})
			.catch((error) => {
				onTestComplete(`Error: ${error}`);
			});
	}

	return (
		<button type="button" className={className} onClick={handleTest}>
			Sign Up
		</button>
	);
}
