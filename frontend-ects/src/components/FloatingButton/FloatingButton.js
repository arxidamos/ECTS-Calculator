import React, { useState } from 'react';
import arrowUp from '../../arrow-up.svg';

import './FloatingButton.css';

const FloatingButton = () => {
  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 400){
      setVisible(true)
    } 
    else if (scrolled <= 400){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };
  
  window.addEventListener('scroll', toggleVisible);
  
  return (
    <div onClick={scrollToTop} className="floating-button"
     style={{display: visible ? 'inline' : 'none'}} >
      <img className="up-button" src={arrowUp} alt="button with arrow that scrolls up" />
    </div>
  );
}

export default FloatingButton;
