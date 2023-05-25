import { RiDeleteBin2Line } from 'react-icons/ri';

function DeleteButton({ handleDeleteNote }) {
	return (
		<button onClick={handleDeleteNote}>
			<RiDeleteBin2Line />
		</button>
	);
}

export default DeleteButton;
