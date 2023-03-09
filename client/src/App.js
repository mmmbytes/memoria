import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Notes from './pages/Notes';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
            <Route 
              path="/"
              element={<Notes />}
            />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
