import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product, addToCart }) => {
    // Verificar si product es nulo o indefinido
    if (!product) {
        return null; // Renderizar nada si product es nulo o indefinido
    }

    // Verificar si product.image es nulo o indefinido
    if (!product.image) {
        return (
            <div className="product">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <button onClick={() => addToCart(product)}>Agregar al Carrito</button>
            </div>
        );
    }

    // Si product y product.image están definidos, renderizar el componente normalmente
    return (
        <div className="product">
            <Link to={`/products/${product.id}`}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${product.price}</p>
            </Link>
            <button onClick={() => addToCart(product)}>Agregar al Carrito</button>
        </div>
    );
};

export default Product;
