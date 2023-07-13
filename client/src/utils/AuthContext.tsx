import { createContext } from 'react';

export type User = {
	accessToken: boolean;
	idToken: boolean;
};

type AuthContextType = {
	user: User | null;
	setUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType>({
	user: null,
	setUser: () => {},
});

export default AuthContext;
