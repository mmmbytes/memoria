import { VscNewFile } from "react-icons/vsc";

function NewNoteButton({ handleNewNote }) {
	return (
		<button onClick={handleNewNote}>
			<VscNewFile />
		</button>
	);
}

export default NewNoteButton;
