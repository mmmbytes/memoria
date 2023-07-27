import './App.css';

import { FC, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import AppRouter from './AppRouter';

const App: FC = () => {
	const [cookies] = useCookies(['isAuthenticated']);
	const [isLoading, setLoading] = useState<boolean>(true);

	console.log('App: isAuthenticated: ', cookies.isAuthenticated);
	useEffect(() => {
		if (!cookies.isAuthenticated) {
			window.location.href = process.env.REACT_APP_LOGIN_URL;
		}
		setLoading(false);
	}, [cookies.isAuthenticated]);

	return (
		<div className="App">
			{isLoading || !cookies.isAuthenticated ? (
				// TODO: Add a splash screen
				<div>Loading...</div>
			) : (
				<AppRouter />
			)}
		</div>
	);
};
export default App;
