import { FC, useContext, useEffect } from 'react';

import NoteManager from '../components/NoteManager';
import AuthContext from '../utils/AuthContext';

const NoteWorkspace: FC = () => {
	const { isAuthenticated } = useContext(AuthContext);

	useEffect(() => {
		if (!isAuthenticated) {
			window.location.href = process.env.REACT_APP_LOGIN_URL;
		}
		console.log('User is authenticated');
	}, [isAuthenticated]);

	return isAuthenticated ? <NoteManager /> : null;
};

export default NoteWorkspace;
