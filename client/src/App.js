import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './pages/Main';
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
              element={<Main />}
            />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
