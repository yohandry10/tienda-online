import React from 'react'; // Imports React library
import Product from './Product'; // Imports the Product component
import productos from '../data/ProductosData'; // Imports the productos array

const ProductList = ({ addToCart }) => { // Defines ProductList component
  return (
    <div className="product-list">
      {productos.map((product) => ( // Iterates over productos array
        <Product // Renders a Product component for each product
          key={product.id} // Assigns a unique key based on product id
          product={product} // Passes the product data as a prop
          addToCart={addToCart} // Passes the addToCart function as a prop
        />
      ))}
    </div>
  );
};

export default ProductList;
