// BackToTopButtonComponent.jsx
import React, { useState, useEffect } from 'react';


const BackToTopButtonComponent = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showButton) return null;

  return (
    <button onClick={handleClick} className="back-to-top">↑</button>
  );
};

export default BackToTopButtonComponent;
