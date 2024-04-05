import React, { useState } from 'react';
import CartItem from './CartItem';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
    const [isCheckingOut, setIsCheckingOut] = useState(false);

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

    const checkStockAndCheckout = () => {
        setIsCheckingOut(true);
        Promise.all(cartItems.map(item =>
            fetch(`/api/products/${item.id}`)
                .then(response => response.json())
                .then(data => ({ ...item, stock: data.stock }))
        )).then(results => {
            const outOfStockItems = results.filter(item => item.stock < item.qty);
            if (outOfStockItems.length > 0) {
                alert("Algunos productos en tu carrito ya no tienen suficiente stock. Por favor, ajusta las cantidades antes de proceder.");
                setIsCheckingOut(false);
            } else {
                // Aquí deberías implementar la lógica de finalización de compra, por ejemplo:
                console.log("Procediendo al pago");
                // completePurchase(); // Asegúrate de definir cómo manejas el proceso de compra
                setIsCheckingOut(false);
            }
        }).catch(error => {
            console.error("Error al verificar el stock:", error);
            setIsCheckingOut(false);
        });
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
                    <button
                        style={styles.button}
                        onClick={checkStockAndCheckout}
                        disabled={isCheckingOut}
                    >
                        {isCheckingOut ? 'Verificando...' : 'Realizar Pago'}
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;
