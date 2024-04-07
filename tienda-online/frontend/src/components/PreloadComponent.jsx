// PreloadComponent.jsx
import React, { useState, useEffect } from 'react';


const PreloadComponent = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simular carga con un timeout, reemplazar con tu lógica de carga
    const timer = setTimeout(() => setLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!loaded) {
    return <div className="preload">Cargando...</div>;
  }

  return null;
};

export default PreloadComponent;
