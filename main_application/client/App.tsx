import './App.css';

import { FC } from 'react';

import AppRouter from './routes/AppRouter';

const App: FC = () => {
	return (
		<div className="App">
			<AppRouter />
		</div>
	);
};
export default App;
