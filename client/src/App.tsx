import './App.css';

import { FC, useState } from 'react';

import AppRouter from './AppRouter';
import AuthContext from './utils/AuthContext';

const App: FC = () => {
	const [isAuthenticated, setAuthStatus] = useState<boolean>(false);

	return (
		<AuthContext.Provider value={{ isAuthenticated, setAuthStatus }}>
			<div className="App">
				<AppRouter />
			</div>
		</AuthContext.Provider>
	);
};
export default App;
