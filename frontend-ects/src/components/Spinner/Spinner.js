import React from 'react';
import "./Spinner.css"

const Spinner = ({ loading }) => {
    
  return (
    <div className={`spinner-container ${loading ? 'active' : ''}`}>
      <div className="spinner">
        <div className="spinner-inner"></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;