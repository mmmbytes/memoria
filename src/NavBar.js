import React, { useState } from "react";
import {VscClose } from "react-icons/vsc";
import { VscMenu } from "react-icons/vsc";
import './NavBar.css'

const NavBar = () => {
    const [navbarOpen, setbarOpen] = useState(false);

    const handleToggle = () => {
        setbarOpen(prev => !prev);
    }

    return (
      <nav className="nav-bar">
        <div className="nav-flex-container">
          <button className="menu-icon" onClick={handleToggle}>
            {navbarOpen ? <VscClose /> : <VscMenu />}
          </button>
          <ul className={`nav-menu ${navbarOpen ? "show-menu " : ""}`}>
            <div className="nav-links">
              <li>Contents</li>
              <li>Discover</li>
            </div>
          </ul>
          <button className="home-icon">Memoria</button>
        </div>
      </nav>
    );
}

export default NavBar; 
