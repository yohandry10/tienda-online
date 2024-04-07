import React from 'react';
import Product from './Product'; // Asegúrate de importar correctamente Product aquí
import productos from '../data/ProductosData'; // Verifica que la ruta de importación sea correcta

const CatalogoProductos = ({ addToCart }) => {
  // Este componente ahora iterará sobre la lista de productos
  // y renderizará un componente Product para cada uno.
  return (
    <div className="product-list">
      {productos.map((producto) => (
        // Utiliza el componente Product para cada producto
        <Product key={producto.id} product={producto} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default CatalogoProductos;
