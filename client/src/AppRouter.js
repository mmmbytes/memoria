import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotesMain from "./views/NotesWorkspace";
import NavBar from "./components/NavBar";

function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<NotesMain />} />
			</Routes>
			<NavBar />
		</Router>
	);
}

export default AppRouter;
