import './styles/NavBar.css';

import { useState } from 'react';
import { VscClose, VscMenu } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

import btnMod from '../sharedStyles/button.module.css';

const NavBar = () => {
	const [navbarOpen, setbarOpen] = useState(false);

	const handleToggle = () => {
		setbarOpen((prev) => !prev);
	};

	return (
		<nav className="navbar">
			<div className="navbar__container">
				<button className={`${btnMod.btn} navbar__icon`} onClick={handleToggle}>
					{navbarOpen ? <VscClose /> : <VscMenu />}
				</button>
				<ul
					className={`navbar__menu ${
						navbarOpen ? 'navbar__menu--visible' : ''
					}`}
				>
					<div className="navbar__links" onClick={handleToggle}>
						<li className={`${btnMod.btn}`}>
							<Link to="/">Workspace</Link>
						</li>
						<li className={`${btnMod.btn}`}>
							<Link to="/collection">Collection</Link>
						</li>
						<li className={`${btnMod.btn}`}>
							<Link to="/insights">Insights</Link>
						</li>
						<li className={`${btnMod.btn}`}>
							<Link to="/account">Account</Link>
						</li>
					</div>
				</ul>
				<div className="navbar__home-icon">
					<Link to="/">
						<h1 className="navbar__home-text">MEMORIA</h1>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
