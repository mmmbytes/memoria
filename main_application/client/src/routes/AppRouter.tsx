import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthCallback from '../utils/AuthCallback';
import Account from '../views/Account';
import NoteInsights from '../views/NoteInsights';
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
						path="/collection"
						element={<PrivateRoute component={NotesCollection} />}
					/>
					<Route
						path="/insights"
						element={<PrivateRoute component={NoteInsights} />}
					/>
					<Route
						path="/account"
						element={<PrivateRoute component={Account} />}
					/>
				</>
			</Routes>
		</Router>
	);
};

export default AppRouter;
