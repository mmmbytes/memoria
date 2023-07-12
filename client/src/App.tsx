import './App.css';

import { FC, useEffect, useState } from 'react';

import AppRouter from './AppRouter';
import AuthContext from './utils/AuthContext';

const App: FC = () => {
	const [isAuthenticated, setAuthStatus] = useState<boolean>(false);

	useEffect(() => {
		fetch('/api/auth/check', {
			method: 'GET',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.isAuthenticated) {
					setAuthStatus(true);
				}
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<AuthContext.Provider value={{ isAuthenticated, setAuthStatus }}>
			<div className="App">
				<AppRouter />
			</div>
		</AuthContext.Provider>
	);
};
export default App;
