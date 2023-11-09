import { ComponentType, FC } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import { AUTH_COOKIE_NAME } from '../constants/constants';

interface PrivateRouteProps {
	component: ComponentType;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component }) => {
	const [cookies] = useCookies([AUTH_COOKIE_NAME]);

	if (!cookies[AUTH_COOKIE_NAME]) {
		return <Navigate to="/welcome" replace />;
	}

	return (
		<>
			<Component />
			<NavBar />
		</>
	);
};

export default PrivateRoute;
