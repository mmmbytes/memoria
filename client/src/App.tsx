import './App.css';

import { FC, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import AppRouter from './AppRouter';
// import AuthContext, { User } from './utils/AuthContext';

const App: FC = () => {
	// const [user, setUser] = useState<User>(null);
	// const [isLoading, setLoading] = useState<boolean>(true);

	// Check if user's access and id cookies are set
	// useEffect(() => {
	// 	fetch('/api/auth/check', {
	// 		method: 'GET',
	// 		credentials: 'include',
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			if (data.isAuthenticated) {
	// 				setUser({ accessToken: true, idToken: true });
	// 			}
	// 			setLoading(false);
	// 		})
	// 		.catch((err) => {
	// 			console.error(err);
	// 			setLoading(false);
	// 		});
	// }, []);

	// // Show loading screen while checking authentication status
	// return isLoading ? (
	// 	<div>Loading...</div>
	// ) : (
	// 	<AuthContext.Provider value={{ user, setUser }}>

	const [cookies] = useCookies(['isAuthenticated']);
	const [isLoading, setLoading] = useState<boolean>(true);

	console.log(cookies.isAuthenticated);
	console.log(cookies);

	useEffect(() => {
		console.log('This user is authenticated:');
		console.log(cookies.isAuthenticated);
		if (!cookies.isAuthenticated) {
			window.location.href = process.env.REACT_APP_LOGIN_URL;
		}
		setLoading(false);
	}, [cookies.isAuthenticated]);

	return (
		<div className="App">
			{isLoading ? <div>Loading...</div> : <AppRouter />}
		</div>
	);
};
export default App;
