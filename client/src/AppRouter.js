import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotesWorkspace from "./views/NotesWorkspace";
import NotesCollection from "./views/NotesCollection";
import NavBar from "./components/NavBar";

function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<NotesWorkspace />} />
				<Route path='/notes-collection' element={<NotesCollection />} />
			</Routes>
			<NavBar />
		</Router>
	);
}

export default AppRouter;
