import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthCallback from '../utils/AuthCallback';
import NotesCollection from '../views/NotesCollection';
import NoteWorkspace from '../views/NoteWorkspace';
import Welcome from '../views/Welcome';
import PrivateRoute from './PrivateRoute';

const AppRouter: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/welcome" element={<Welcome />} />
				<Route path="/auth/callback" element={<AuthCallback />} />
				<>
					<Route
						path="/"
						element={<PrivateRoute component={NoteWorkspace} />}
					/>
					<Route
						path="/note/:noteId"
						element={<PrivateRoute component={NoteWorkspace} />}
					/>
					<Route
						path="/notes-collection"
						element={<PrivateRoute component={NotesCollection} />}
					/>
				</>
			</Routes>
		</Router>
	);
};

export default AppRouter;
