import { FC, useContext, useEffect } from 'react';

import NoteManager from '../components/NoteManager';
import AuthContext from '../utils/AuthContext';

const NoteWorkspace: FC = () => {
	const { isAuthenticated } = useContext(AuthContext);

	useEffect(() => {
		console.log('Checking auth status2...');
		console.log(isAuthenticated);
		if (!isAuthenticated) {
			window.location.href = process.env.REACT_APP_LOGIN_URL;
		}
	}, [isAuthenticated]);

	return isAuthenticated ? <NoteManager /> : null;
};

export default NoteWorkspace;
