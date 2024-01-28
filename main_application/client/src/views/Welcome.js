import './styles/Welcome.css';

import { SignInButton } from '../components/buttons/AccountActionsButtons';
import MemoriaLogo from '../images/memoria-logo-large.png';
import btnMod from '../sharedStyles/button.module.css';

function Welcome() {
	return (
		<div className="welcome">
			<div className="welcome__heading">
				<h1 className="welcome__title">MEMORIA</h1>
				<div className="welcome__logo-container">
					<img
						className="welcome__logo-img"
						src={MemoriaLogo}
						alt="Memoria Logo"
					/>
					<h2 className="welcome__logo-txt">Your thoughts. Untangled.</h2>
				</div>
			</div>
			<div className="welcome__btn-container">
				<SignInButton
					className={`${btnMod.btn} ${btnMod.btnStyled} welcome__btn`}
				/>
			</div>
		</div>
	);
}

export default Welcome;
