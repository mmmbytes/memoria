import { IoIosArrowDown } from 'react-icons/io';

export function RevealInsightsButton({ className, onClick, loading }) {
	return (
		<button
			type="button"
			className={className}
			onClick={onClick}
			loading={loading}
		>
			{loading ? 'Loading Insights' : 'Reveal Insights'}
		</button>
	);
}

export function CloseDetailsButton({ className, onClick }) {
	return (
		<IoIosArrowDown
			type="button"
			className={className}
			onClick={onClick}
		></IoIosArrowDown>
	);
}
