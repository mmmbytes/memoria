import { useEffect, useContext, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const AuthCallback: FC = () => {
	const { setAuthStatus } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const authCode = urlParams.get('code');

		//TODO: Delete console.log() statements. They are for debugging only.
		if (authCode) {
			console.log('authCode received.');
			setAuthStatus(true);
			navigate('/');
		} else {
			setAuthStatus(false);
			console.log('no authCode');
			window.location.href = process.env.REACT_APP_LOGIN_URL;
		}
	}, []);

	return <div>Processing authentication...</div>;
};

export default AuthCallback;
