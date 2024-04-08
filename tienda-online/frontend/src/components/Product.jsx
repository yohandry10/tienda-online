import React from 'react';
import { Link } from 'react-router-dom';

// Estilos actualizados para mostrar el botón
const styles = {
    container: {
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '8px',
        margin: '4px',
        width: '340px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    image: {
        width: '100%',
        height: '340px',
        objectFit: 'cover',
        borderRadius: '4px',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
        marginTop: '10px',
        display: 'inline-block', // Cambiado para mostrar el botón
    },
};

const Product = ({ product, addToCart }) => {
    if (!product) return null;

    return (
      <div style={styles.container}>
        <Link to={`/products/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={styles.image}
          />
        </Link>
        {/* Botón para agregar al carrito */}
        <button
          style={styles.button}
          onClick={() => addToCart(product)}
        >
          Agregar al Carrito
        </button>
      </div>
    );
};

export default Product;
