import './App.css';

import { FC, useEffect, useState } from 'react';

import AppRouter from './AppRouter';
import AuthContext from './utils/AuthContext';

const App: FC = () => {
	const [isAuthenticated, setAuthStatus] = useState<boolean>(false);
	const [isLoading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		console.log('Checking auth status...');
		fetch('/api/auth/check', {
			method: 'GET',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.isAuthenticated) {
					console.log('User is authenticated.');
					console.log(data.isAuthenticated);
					setAuthStatus(true);
				}
				setLoading(false);
				console.log(data.isAuthenticated);
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	}, []);

	console.log(isAuthenticated);

	return (
		<AuthContext.Provider value={{ isAuthenticated, setAuthStatus }}>
			<div className="App">
				<AppRouter />
			</div>
		</AuthContext.Provider>
	);
};
export default App;
