import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '/home/dimos/Desktop/ectsTool/ects-tool/src/logo.svg';
import burger from '/home/dimos/Desktop/ectsTool/ects-tool/src/menu.svg';
import x_burger from '/home/dimos/Desktop/ectsTool/ects-tool/src/x.svg';

import './Navigation.css';

const Navigation = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click)
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink to="/" className="nav-logo">
            ECTS Calculator
              <img className="logo" src={logo} alt="website logo" />
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className="nav-links"
                onClick={handleClick}
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}
            <img className={`burger-icon ${click ? 'fade-in' : ''}`} src={click ? x_burger : burger} alt="burger menu icon, courtesy of featherIcons" />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;