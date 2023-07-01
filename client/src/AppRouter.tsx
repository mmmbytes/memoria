import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import UserLogin from './components/UserLogin';
import AuthCallback from './utils/AuthCallback';
import NotesCollection from './views/NotesCollection';
import NoteWorkspace from './views/NoteWorkspace';

const AppRouter: FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<NoteWorkspace />} />
				<Route path="/note/:noteId" element={<NoteWorkspace />} />
				<Route path="/notes-collection" element={<NotesCollection />} />
				<Route path="/account" element={<UserLogin />} />
				<Route path="/auth/callback" element={<AuthCallback />} />
			</Routes>
			<NavBar />
		</Router>
	);
};

export default AppRouter;
