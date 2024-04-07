import React from 'react';
import { Link } from 'react-router-dom';

// Estilos en línea para el componente Product.
const styles = {
  container: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '16px',
    margin: '16px',
    width: '200px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    marginBottom: '8px',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

const Product = ({ product, addToCart }) => {
  if (!product) return null;

  return (
    <div style={styles.container}>
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} style={styles.image} />
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      </Link>
      <button style={styles.button} onClick={() => addToCart(product)}>Agregar al Carrito</button>
    </div>
  );
};

export default Product;
