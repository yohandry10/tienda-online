import React from 'react';
import { useLocation } from 'react-router-dom';
import HeroSliderComponent from './HeroSliderComponent';

const HeroSliderControl = () => {
  const location = useLocation();

  // Renderiza el HeroSlider solo en la ruta de inicio
  if (location.pathname !== '/') {
    return null;
  }

  return <HeroSliderComponent />;
};

export default HeroSliderControl;
