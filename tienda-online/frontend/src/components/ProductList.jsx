import React from 'react';
import Product from './Product';
import productos from '../data/ProductosData';

const ProductList = ({ addToCart }) => {
  return (
    <div className="product-list">
      {productos.map((product) => (
        <Product key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;
