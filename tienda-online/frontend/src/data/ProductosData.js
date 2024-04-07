// src/data/ProductosData.js
import image1 from '../assets/img/1.jpg';
import image2 from '../assets/img/2.jpg';
import image3 from '../assets/img/3.jpg';
import image4 from '../assets/img/4.jpg';
import image5 from '../assets/img/5.jpg';
import image6 from '../assets/img/6.jpg';
import image7 from '../assets/img/7.jpg';
import image8 from '../assets/img/8.jpg';
import image9 from '../assets/img/9.jpg';
import image10 from '../assets/img/10.jpg';

const productos = [
  { id: "1", name: "Producto 1", description: "Descripción del Producto 1", price: 100, image: image1, category: "Categoría 1" },
  { id: "2", name: "Producto 2", description: "Descripción del Producto 2", price: 150, image: image2, category: "Categoría 2" },
  { id: "3", name: "Producto 3", description: "Descripción del Producto 3", price: 120, image: image3, category: "Categoría 1" },
  { id: "4", name: "Producto 4", description: "Descripción del Producto 4", price: 200, image: image4, category: "Categoría 2" },
  { id: "5", name: "Producto 5", description: "Descripción del Producto 5", price: 90, image: image5, category: "Categoría 1" },
  { id: "6", name: "Producto 6", description: "Descripción del Producto 6", price: 180, image: image6, category: "Categoría 2" },
  { id: "7", name: "Producto 7", description: "Descripción del Producto 7", price: 110, image: image7, category: "Categoría 1" },
  { id: "8", name: "Producto 8", description: "Descripción del Producto 8", price: 160, image: image8, category: "Categoría 2" },
  { id: "9", name: "Producto 9", description: "Descripción del Producto 9", price: 130, image: image9, category: "Categoría 1" },
  { id: "10", name: "Producto 10", description: "Descripción del Producto 10", price: 220, image: image10, category: "Categoría 2" }
  // Nota: Asumimos que las imágenes para los productos 11 y 12 no son necesarias en este momento.
];

export default productos;
