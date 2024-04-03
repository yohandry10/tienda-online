import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.qty), 0).toFixed(2);
    };

    return (
        <div className="cart">
            {cartItems.length === 0 ? (
                <p>Su carrito está vacío.</p>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            removeFromCart={removeFromCart}
                            updateQuantity={updateQuantity}
                        />
                    ))}
                    <h3>Total: ${calculateTotal()}</h3>
                    <button>Realizar Pago</button>
                </>
            )}
        </div>
    );
};

export default Cart;
