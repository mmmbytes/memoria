import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback: FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const authCode = urlParams.get('code');

		if (authCode) {
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
			console.error('Authentication failed');
			window.location.href = process.env.REACT_APP_LOGIN_URL;
		}
	}, []);

	return <div>Processing authentication...</div>;
};

export default AuthCallback;
