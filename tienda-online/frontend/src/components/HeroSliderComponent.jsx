import React, { useState, useEffect } from 'react';

// Importa las imágenes que quieres mostrar
import sliderImage1 from '../assets/img/header.jpg';
import sliderImage2 from '../assets/img/slider2.jpg';
import sliderImage3 from '../assets/img/slider4.jpg';

const images = [sliderImage1, sliderImage2, sliderImage3]; // Array de imágenes

const HeroBannerComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para controlar el índice de la imagen actual

  useEffect(() => {
    const interval = setInterval(() => {
      // Cambia al próximo slide cada 3 segundos
      setCurrentIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 3000); // Cambia la imagen cada 3000 milisegundos (3 segundos)

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, []);

  // Función para ir al slide anterior
  const goToPrevious = () => {
    setCurrentIndex(currentIndex => (currentIndex - 1 + images.length) % images.length);
  };

  // Función para ir al siguiente slide
  const goToNext = () => {
    setCurrentIndex(currentIndex => (currentIndex + 1) % images.length);
  };

  return (
    <div style={{
      backgroundImage: `url(${images[currentIndex]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '300px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative', // Para posicionar absolutamente las flechas
      transition: 'background-image 0.5s ease-in-out',
    }}>
    
      {/* Botones de navegación como flechas */}
      <button onClick={goToPrevious} style={{ 
        position: 'absolute', 
        left: 20, 
        top: '50%', 
        transform: 'translateY(-50%)', 
        fontSize: '24px',
        color: '#fff',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}>
        &#10094; {/* Símbolo de flecha hacia la izquierda */}
      </button>
      <button onClick={goToNext} style={{ 
        position: 'absolute', 
        right: 20, 
        top: '50%', 
        transform: 'translateY(-50%)', 
        fontSize: '24px',
        color: '#fff',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}>
        &#10095; {/* Símbolo de flecha hacia la derecha */}
      </button>
    </div>
  );
};

export default HeroBannerComponent;
