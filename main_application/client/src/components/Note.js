export function NoteTitle({ title, className }) {
	if (!title) {
		return null;
	}
	return <h2 className={className}>{title}</h2>;
}

export function NoteBody({ textbody, className }) {
	if (!textbody) {
		return null;
	}
	return <p className={className}>{textbody}</p>;
}
