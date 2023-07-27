import './App.css';

import { FC } from 'react';

import AppRouter from './AppRouter';

const App: FC = () => {
	console.log('App');
	return (
		<div className="App">
			<AppRouter />
		</div>
	);
};
export default App;
