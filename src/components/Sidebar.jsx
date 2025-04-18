import React from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../App.css';

const Sidebar = () => {

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "Sunset-Theme");

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeChange = (e) => {
        setTheme(e.target.value);
    };

    return (
        <div className="sidebar">
            <div className="sidebarHeader">
                <p>All Files</p>
            </div>
            <div className="sidebarContent">
                <ul>
                    <li>
                        <NavLink to="/html" className={({ isActive }) => isActive ? 'active' : ''}>
                            <i id='htmlIcon' className="fa-brands fa-html5"></i> <p>index.html</p>
                        </NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink to="/css" className={({ isActive }) => isActive ? 'active' : ''}>
                            <i id='cssIcon' className="fa-brands fa-css3-alt"></i> style.css
                        </NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink to="/js" className={({ isActive }) => isActive ? 'active' : ''}>
                            <i id='jsIcon' className="fa-brands fa-js"></i> script.js
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="sidebarFooter">
                {/* <p></p> */}
                <p >
                        <select id="themeSelect" value={theme} onChange={handleThemeChange}>
                            {/* <option value="" hidden>Default</option> */}
                            <option value="dark-theme">Dark-Theme</option>
                            <option value="theme-ocean">Ocean-Theme</option>
                            <option value="theme-galaxy">Galaxy-Theme</option>
                            <option value="theme-mint">Mint-Theme</option>
                            <option value="theme-cyberpunk">Cyberpunk-Theme</option>
                            <option value="theme-forest">Forest-Theme</option>
                            <option value="theme-solarized">Solarized-Theme</option>
                            <option value="theme-sunset">Sunset-Theme</option>
                        </select>
                </p>
                <p>© 2025 CodeShell</p>
                <p>Version 1.0.0</p>
                <p>Made with <i className="fa-solid fa-heart"></i> by Chatriwala</p>
                {/* <p><i className="fa-solid fa-copyright"></i> 2023</p> */}
                {/* <p>License: MIT</p>
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
                <p>Contact Us</p>
                <p>About Us</p>
                <p>Help</p>
                <p>Feedback</p>
                <p>Support</p>
                <p>Forum</p>
                <p>Blog</p> */}
            </div>
        </div>
    );
};

export default Sidebar;
