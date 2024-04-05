import React from 'react';

const ProductDetails = ({ product }) => {
  if (!product || !product.name) {
    return <p>No se encontraron detalles del producto.</p>;
  }

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Stock disponible: {product.stock > 0 ? `${product.stock} unidades` : "Producto no disponible"}</p>
      {/* Asegúrate de incluir aquí cualquier otra propiedad del producto que desees renderizar */}
    </div>
  );
};

export default ProductDetails;
