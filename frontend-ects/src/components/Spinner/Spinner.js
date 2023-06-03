import React from 'react';
import "./Spinner.css"
import { useEffect, useState } from "react";

const Spinner = ({ loading }) => {
    
  return (
    <div className={`spinner-container ${loading ? 'active' : ''}`}>
      <div className="spinner">
        {/* <div></div>
        <div></div> */}
        <div className="spinner-inner"></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;