import { createContext } from 'react';

type AuthContextType = {
	isAuthenticated: boolean;
	setAuthStatus: (isAuthenticated: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	setAuthStatus: () => {},
});

export default AuthContext;
