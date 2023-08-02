import { FC, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import NoteManager from '../components/NoteManager';

const NoteWorkspace: FC = () => {
	const AUTH_COOKIE_NAME = 'isAuthenticated';
	const [cookies] = useCookies([AUTH_COOKIE_NAME]);
	const [isLoading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!cookies[AUTH_COOKIE_NAME]) {
			window.location.href = process.env.REACT_APP_LOGIN_URL;
		}
		setLoading(false);
	}, [cookies[AUTH_COOKIE_NAME]]);

	return isLoading || !cookies[AUTH_COOKIE_NAME] ? (
		// TODO: Add a loading animation
		<div>Loading...</div>
	) : (
		<NoteManager />
	);
};

export default NoteWorkspace;
