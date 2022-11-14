import React, { useState } from "react";

function NavMenu() {
    const [navmenuOpen, setNavmenuOpen] = useState(false);
    const handleToggle = () => {
        setNavmenuOpen(prev => !prev)
      };

    return (
        <nav className="navMenu">
            <button onClick={handleToggle}>{navmenuOpen ? "Close" : "Open"}</button>
            <ul>
                <li>Contents</li>
                <li>Discover</li>
            </ul>
        </nav>
    );
}

export default NavMenu; 
