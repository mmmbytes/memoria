import './Welcome.css';

import { SignInButton } from '../components/Buttons';
import MemoriaLogo from '../images/memoria-logo-large.png';

function Welcome() {
	return (
		<div className="welcome">
			<div className="welcome__heading">
				<h1 className="welcome__header">MEMORIA</h1>
				<div className="welcome__logo">
					<img
						className="welcome__logo--img"
						src={MemoriaLogo}
						alt="Memoria Logo"
					/>
					<h2 className="welcome__logo--txt">Your thoughts. Untangled.</h2>
				</div>
			</div>
			<SignInButton className="welcome__btn" />
		</div>
	);
}

export default Welcome;
