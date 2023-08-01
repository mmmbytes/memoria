import { FC, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import NoteManager from '../components/NoteManager';

const NoteWorkspace: FC = () => {
	const authCookieName = 'isAuthenticated';
	const [cookies] = useCookies([authCookieName]);
	const [isLoading, setLoading] = useState<boolean>(true);

	console.log(cookies[authCookieName]);

	useEffect(() => {
		if (!cookies[authCookieName]) {
			window.location.href = process.env.REACT_APP_LOGIN_URL;
		}
		setLoading(false);
	}, [cookies[authCookieName]]);

	return isLoading || !cookies[authCookieName] ? (
		// TODO: Add a loading animation
		<div>Loading...</div>
	) : (
		<NoteManager />
	);
};

export default NoteWorkspace;
