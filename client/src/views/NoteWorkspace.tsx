import { FC } from 'react';

import NoteManager from '../components/NoteManager';
// import AuthContext from '../utils/AuthContext';

const NoteWorkspace: FC = () => {
	// const { user } = useContext(AuthContext);

	// useEffect(() => {
	// 	if (user === null) {
	// 		window.location.href = process.env.REACT_APP_LOGIN_URL;
	// 	}
	// }, [user]);

	return <NoteManager />;
};

export default NoteWorkspace;
