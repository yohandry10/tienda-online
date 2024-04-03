import React from 'react';

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
    return (
        <div className="cart-item">
            <img src={item.image} alt={item.name} />
            <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Precio: ${item.price}</p>
                <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                />
                <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
        </div>
    );
};

export default CartItem;
