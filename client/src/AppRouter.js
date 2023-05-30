import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NoteWorkspace from './views/NoteWorkspace';
import NotesCollection from './views/NotesCollection';
import NavBar from './components/NavBar';
import UserLogin from './components/UserLogin';

function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<NoteWorkspace />} />
				<Route path="/note/:noteId" element={<NoteWorkspace />} />
				<Route path="/notes-collection" element={<NotesCollection />} />
				<Route path="Login" element={<UserLogin />} />
			</Routes>
			<NavBar />
		</Router>
	);
}

export default AppRouter;
