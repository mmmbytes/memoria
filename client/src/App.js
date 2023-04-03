import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ActiveNote from "./pages/ActiveNote";
import "./App.css";

function App() {
  return (
	  <div className='App'>
		  <Router>
			  <NavBar />
			  <Routes>
				  <Route path='/' element={<ActiveNote />} />
			  </Routes>
		  </Router>
	  </div>
  );
}

export default App;
