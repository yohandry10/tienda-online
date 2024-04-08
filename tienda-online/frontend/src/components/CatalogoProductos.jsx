import React from 'react';
import Product from './Product'; // Verifica que esta ruta de importación sea correcta
import productos from '../data/ProductosData'; // Verifica que esta ruta de importación sea correcta

const CatalogoProductos = ({ addToCart }) => {
  return (
    <div className="product-list">
      {productos.map((producto) => (
        <Product key={producto.id} product={producto} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default CatalogoProductos;
