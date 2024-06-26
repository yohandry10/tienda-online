import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import CatalogoProductos from './components/CatalogoProductos';
import Cart from './components/Cart';
import NavBar from './components/NavBar';
import ProductDetails from './components/ProductDetails';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import GestorCompras from './components/PurchaseManager';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PreloadComponent from './components/PreloadComponent';
import ParallaxEffectComponent from './components/ParallaxEffectComponent';
import BackToTopButtonComponent from './components/BackToTopButtonComponent';
import HeroSliderControl from './components/HeroSliderControl';

const Televisores = () => {
    return (
      <div>
        <h2>Televisores</h2>
        <p>Aquí va el contenido de la página de Televisores</p>
      </div>
    );
}

const ModaMujeres = () => {
    return (
      <div>
        <h2>Moda Mujeres</h2>
        <p>Aquí va el contenido de la página de Moda Mujeres</p>
      </div>
    );
}

const ModaHombres = () => {
    return (
      <div>
        <h2>Moda Hombres</h2>
        <p>Aquí va el contenido de la página de Moda Hombres</p>
      </div>
    );
}

const Ninos = () => {
    return (
      <div>
        <h2>Niños</h2>
        <p>Aquí va el contenido de la página de Niños</p>
      </div>
    );
}

const Deportes = () => {
    return (
      <div>
        <h2>Deportes</h2>
        <p>Aquí va el contenido de la página de Deportes</p>
      </div>
    );
}

function App() {
    const [cartItems, setCartItems] = useState([]);
    const auth = useAuth();

    const addToCart = (product) => {
        const exist = cartItems.find((item) => item.id === product.id);
        if (exist) {
            setCartItems(cartItems.map((item) => item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item));
        } else {
            setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, newQty) => {
        setCartItems(cartItems.map((item) => item.id === productId ? { ...item, qty: newQty } : item));
    };

    const totalCartItems = cartItems.reduce((total, item) => total + item.qty, 0);

    return (
        <AuthProvider>
            <Router>
                <PreloadComponent />
                <NavBar totalCartItems={totalCartItems} />
                <HeroSliderControl />
                <Routes>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/" element={
                        auth.currentUser ? (
                            <ParallaxEffectComponent>
                                <CatalogoProductos addToCart={addToCart} />
                            </ParallaxEffectComponent>
                        ) : (
                            <Navigate to="/signin" />
                        )
                    } />
                    <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/admin" element={auth.currentUser ? <GestorCompras /> : <Navigate to="/signin" />} />
                    <Route path="/category/televisores" element={<Televisores />} />
                    <Route path="/category/moda-mujeres" element={<ModaMujeres />} />
                    <Route path="/category/moda-hombres" element={<ModaHombres />} />
                    <Route path="/category/ninos" element={<Ninos />} />
                    <Route path="/category/deportes" element={<Deportes />} />
                    {/* Agrega más rutas según sea necesario */}
                </Routes>
                <BackToTopButtonComponent />
            </Router>
        </AuthProvider>
    );
}

export default App;
