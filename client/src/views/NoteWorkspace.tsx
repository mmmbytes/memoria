import { useContext, useEffect, FC } from 'react';
import AuthContext from '../utils/AuthContext';
import NoteManager from '../components/NoteManager';

const NoteWorkspace: FC = () => {
	const { isAuthenticated } = useContext(AuthContext);

	useEffect(() => {
		if (!isAuthenticated) {
			window.location.href =
				'https://login.memoria.page/login?response_type=code&client_id=301le3fr01j0bcaraeqde4puml&redirect_uri=https://memoria.page/';
		}
	}, [isAuthenticated]);

	return isAuthenticated ? <NoteManager /> : null;
};

export default NoteWorkspace;
