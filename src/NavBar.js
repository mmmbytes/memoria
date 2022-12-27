import React, { useState } from "react";
import './NavBar.css'

const NavBar = () => {
    const [navbarOpen, setbarOpen] = useState(false);

    const handleToggle = () => {
        setbarOpen(prev => !prev);
    }

    return (
    <nav className="nav-bar">
      <button onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</button>
      <ul className={`menu-nav ${navbarOpen ? "show-menu " : ""}`}>
        <div className="nav-links">
          <li>Contents</li>
          <li>Discover</li>
        </div>
      </ul>
    </nav>
    );
}

export default NavBar; 
