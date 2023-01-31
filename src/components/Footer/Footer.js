import React from 'react';
import { Link } from 'react-router-dom';
import "./Footer.css"

const Footer = () => {
  return (
    <div className="footer">
      <p>© Archidamos {new Date().getFullYear()}</p>
      <p>
        <Link to="/privacy-policy">Privacy Policy</Link>
      </p>
      <p>
        <Link to="/privacy-policy">Terms of Service</Link>
      </p>
    </div>

  );
};

export default Footer;