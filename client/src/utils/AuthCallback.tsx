import { FC, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from './AuthContext';

const AuthCallback: FC = () => {
	const { setAuthStatus } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const authCode = urlParams.get('code');

		if (authCode) {
			setAuthStatus(true);

			fetch('/api/auth/exchange', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ authCode }),
				credentials: 'include',
			})
				.then((response) => {
					if (response.ok) {
						navigate('/');
						return response.json();
					} else {
						throw new Error('Failed to exchange auth code');
					}
				})
				.catch((error) => console.log(error));
		} else {
			setAuthStatus(false);
			console.error('Authentication failed');
			window.location.href = process.env.REACT_APP_LOGIN_URL;
		}
	}, []);

	return <div>Processing authentication...</div>;
};

export default AuthCallback;
