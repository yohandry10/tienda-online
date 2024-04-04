import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.qty), 0).toFixed(2);
    };

    const styles = {
        cartContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            marginTop: '20px',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            backgroundColor: '#f9f9f9',
            maxWidth: '600px',
            margin: '20px auto',
        },
        button: {
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
            marginTop: '10px',
        },
        emptyCartMessage: {
            textAlign: 'center',
            fontSize: '18px',
            margin: '20px',
        }
    };

    return (
        <div style={styles.cartContainer}>
            {cartItems.length === 0 ? (
                <p style={styles.emptyCartMessage}>Su carrito está vacío.</p>
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
                    <button style={styles.button}>Realizar Pago</button>
                </>
            )}
        </div>
    );
};

export default Cart;
