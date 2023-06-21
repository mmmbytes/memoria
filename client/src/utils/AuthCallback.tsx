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

		if (authCode) {
			console.log('authCode:', authCode);
			setAuthStatus(true);
			navigate('/');
		} else {
			setAuthStatus(false);
			console.log('no authCode');
			window.location.href =
				'https://login.memoria.page/login?response_type=code&client_id=301le3fr01j0bcaraeqde4puml&redirect_uri=https://memoria.page/';
		}
	}, []);

	return <div>Processing authentication...</div>;
};

export default AuthCallback;
