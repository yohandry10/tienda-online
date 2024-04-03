import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Ajusta la ruta según tu estructura de carpetas

const NavBar = ({ totalCartItems }) => { // Añade la prop totalCartItems aquí
    const { currentUser, logout } = useAuth();

    async function handleLogout() {
        try {
            await logout();
            console.log("Has cerrado sesión con éxito");
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    }

    return (
        <nav>
            <Link to="/">Inicio</Link> | <Link to="/cart">Carrito ({totalCartItems})</Link> <Link to="/admin">Administrador de compras</Link>
            {currentUser && (
                <button onClick={handleLogout}>Cerrar Sesión</button>
            )}
        </nav>
    );
};

export default NavBar;
