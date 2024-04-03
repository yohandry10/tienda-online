import React from 'react';

const ProductDetails = ({ product }) => {
    if (!product || !product.name) {
      return <p>No se encontraron detalles del producto.</p>;
    }
  
    return (
      <div className="product-details">
        <h2>{product.name}</h2>
        {/* Renderizar otras propiedades del producto aquí */}
      </div>
    );
  };
  
  export default ProductDetails;
  