// src/components/CatalogoProductos.js
import React from 'react';
import ProductList from './ProductList'; // Corregir el import aquí
import productos from '../data/ProductosData'; // Asegúrate de que la ruta sea correcta

const CatalogoProductos = ({ addToCart }) => { // Aceptar props aquí
  return (
    <div className="product-list">
      {productos.map((producto) => (
        <ProductList key={producto.id} producto={producto} addToCart={addToCart} /> // Pasar addToCart a ProductList
      ))}
    </div>
  );
};

export default CatalogoProductos;
