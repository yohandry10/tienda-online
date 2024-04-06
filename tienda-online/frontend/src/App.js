import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import './index.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import NavBar from './components/NavBar';
import ProductDetails from './components/ProductDetails';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';

import GestorCompras from './components/PurchaseManager';

const PrivateRoute = ({ element }) => {
    const { currentUser } = useAuth();
    return currentUser ? element : <Navigate to="/signin" />;
};

function App() {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        const exist = cartItems.find((item) => item.id === product.id);
        if (exist) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, newQty) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === productId ? { ...item, qty: newQty } : item
            )
        );
    };

    const totalCartItems = cartItems.reduce((total, item) => total + item.qty, 0);

    return (
        <AuthProvider>
            <Router>
                <NavBar totalCartItems={totalCartItems} />
                <Routes>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route element={<PrivateRoute element={<Outlet />} />}>
                        <Route path="/" element={<ProductList addToCart={addToCart} />} />
                        <Route path="cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
                        <Route path="products/:id" element={<ProductDetails />} />
                        <Route path="admin" element={<GestorCompras />} />
                    </Route>
                </Routes>

            </Router>
        </AuthProvider>
    );
}

export default App; 
