import { useContext, useEffect, FC } from 'react';
import AuthContext from '../utils/AuthContext';
import NoteManager from '../components/NoteManager';

const NoteWorkspace: FC = () => {
	const { isAuthenticated } = useContext(AuthContext);

	useEffect(() => {
		if (!isAuthenticated) {
			window.location.href = process.env.REACT_APP_LOGIN_URL;
		}
	}, [isAuthenticated]);

	return isAuthenticated ? <NoteManager /> : null;
};

export default NoteWorkspace;
