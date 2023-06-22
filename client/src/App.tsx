import { useState, FC } from 'react';
// import AuthContext from './utils/AuthContext';
import AppRouter from './AppRouter';
import './App.css';

const App: FC = () => {
	//const [isAuthenticated, setAuthStatus] = useState<boolean>(false);

	return (
		//	<AuthContext.Provider value={{ isAuthenticated, setAuthStatus }}>
		<div className="App">
			<AppRouter />
		</div>
		//	</AuthContext.Provider>
	);
};
export default App;
