import React, { useState } from "react";
import { Link } from "react-router-dom";
import { VscClose, VscMenu } from "react-icons/vsc";
import "./NavBar.css";

const NavBar = () => {
	const [navbarOpen, setbarOpen] = useState(false);

	const handleToggle = () => {
		setbarOpen((prev) => !prev);
	};

	return (
		<nav className='navbar'>
			<div className='navbar__container'>
				<button className='navbar__icon' onClick={handleToggle}>
					{navbarOpen ? <VscClose /> : <VscMenu />}
				</button>
				<ul
					className={`navbar__menu ${navbarOpen ? "navbar__menu--show" : ""}`}
				>
					<div className='navbar__links'>
						<li>
							<Link to='/'>Note Workspace</Link>
						</li>
						<li>
							<Link to='/notes-collection'>Notes Collection</Link>
						</li>
						<li>Discover</li>
						<li>Account</li>
					</div>
				</ul>
				<div className='home-icon'>
					<Link to='/'>
						<h1>Memoria</h1>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
