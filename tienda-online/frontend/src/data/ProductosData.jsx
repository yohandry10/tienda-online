import React from 'react';

// Reorganizamos las importaciones de las imágenes para que coincidan con los productos
import image1 from '../assets/img/boxengasse.png';
import image2 from '../assets/img/englishrose.png';
import image3 from '../assets/img/knocknap.png';
import image4 from '../assets/img/lanight.png';
import image5 from '../assets/img/silverall.png';
import image6 from '../assets/img/skinglam.png';
import image7 from '../assets/img/midimix.png';
import image8 from '../assets/img/sirblue.png';
import image9 from '../assets/img/middlesteel.png';

// Ajustamos la estructura de los productos a 9 elementos
const productos = [
  { id: "1", name: "Producto 1", description: "Descripción del Producto 1", price: 100, image: image1, category: "Categoría 1" },
  { id: "2", name: "Producto 2", description: "Descripción del Producto 2", price: 150, image: image2, category: "Categoría 2" },
  { id: "3", name: "Producto 3", description: "Descripción del Producto 3", price: 120, image: image3, category: "Categoría 1" },
  { id: "4", name: "Producto 4", description: "Descripción del Producto 4", price: 200, image: image4, category: "Categoría 2" },
  { id: "5", name: "Producto 5", description: "Descripción del Producto 5", price: 90, image: image5, category: "Categoría 1" },
  { id: "6", name: "Producto 6", description: "Descripción del Producto 6", price: 180, image: image6, category: "Categoría 2" },
  { id: "7", name: "Producto 7", description: "Descripción del Producto 7", price: 110, image: image7, category: "Categoría 1" },
  { id: "8", name: "Producto 8", description: "Descripción del Producto 8", price: 160, image: image8, category: "Categoría 2" },
  { id: "9", name: "Producto 9", description: "Descripción del Producto 9", price: 130, image: image9, category: "Categoría 1" }
];

export default productos;
