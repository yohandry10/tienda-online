import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Reemplaza con la URL real de tu API
        const response = await fetch(`[URL_BACKEND]/api/products/${productId}`);
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (isLoading) {
    return <p>Cargando detalles del producto...</p>;
  }

  if (!product) {
    return <p>No se encontraron detalles del producto.</p>;
  }

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ maxWidth: "100%" }} />
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Stock disponible: {product.stock > 0 ? `${product.stock} unidades` : "Producto no disponible"}</p>
      {/* Asegúrate de incluir aquí cualquier otra propiedad del producto que desees renderizar */}
    </div>
  );
};

export default ProductDetails;
