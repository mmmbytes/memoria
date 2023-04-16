import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotesWorkspace from "./views/NotesWorkspace";
import NavBar from "./components/NavBar";

function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<NotesWorkspace />} />
			</Routes>
			<NavBar />
		</Router>
	);
}

export default AppRouter;
