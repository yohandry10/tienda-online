// ParallaxEffectComponent.jsx
import React from 'react';
import { Parallax } from 'react-parallax'; // Utilizando react-parallax para simplicidad


const ParallaxEffectComponent = ({ image, children }) => {
  return (
    <Parallax bgImage={image} strength={500}>
      {children}
    </Parallax>
  );
};

export default ParallaxEffectComponent;
