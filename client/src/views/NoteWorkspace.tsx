import { FC, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import NoteManager from '../components/NoteManager';

const NoteWorkspace: FC = () => {
	console.log('NoteWorkspace');

	const [cookies] = useCookies(['isAuthenticated']);
	const [isLoading, setLoading] = useState<boolean>(true);

	console.log('NoteWorkspace1: isAuthenticated: ', cookies.isAuthenticated);
	useEffect(() => {
		if (!cookies.isAuthenticated) {
			window.location.href = process.env.REACT_APP_LOGIN_URL;
		}
		setLoading(false);
	}, [cookies.isAuthenticated]);

	return isLoading || !cookies.isAuthenticated ? (
		<div>Loading...</div>
	) : (
		<NoteManager />
	);
};

export default NoteWorkspace;
