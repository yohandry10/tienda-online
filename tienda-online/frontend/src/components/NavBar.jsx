import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavBar = ({ totalCartItems }) => {
    const { currentUser, logout } = useAuth();

    async function handleLogout() {
        try {
            await logout();
            console.log("Has cerrado sesión con éxito");
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    }

    const styles = {
        navBar: {
            backgroundColor: '#343a40', // Fondo oscuro
            color: '#fff', // Texto blanco
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
        },
        linkContainer: {
            display: 'flex',
            alignItems: 'center',
        },
        link: {
            color: '#ffc107', // Dorado
            textDecoration: 'none',
            margin: '0 10px',
            fontWeight: 'bold',
        },
        cartLink: {
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: '#ffc107',
            margin: '0 10px',
            fontWeight: 'bold',
        },
        cartIcon: {
            marginRight: '5px',
        },
        logoutButton: {
            background: 'none',
            border: '2px solid #ffc107',
            borderRadius: '5px',
            color: '#ffc107',
            padding: '5px 10px',
            cursor: 'pointer',
            fontWeight: 'bold',
        }
    };

    return (
        <nav style={styles.navBar}>
            <div style={styles.linkContainer}>
                <Link to="/" style={styles.link}>Inicio</Link>
                <Link to="/admin" style={styles.link}>Administrador de compras</Link>
            </div>
            <div style={styles.linkContainer}>
                <Link to="/cart" style={styles.cartLink}>
                    <span style={styles.cartIcon}>🛒</span>
                    Carrito ({totalCartItems})
                </Link>
                {currentUser ? (
                    <button onClick={handleLogout} style={styles.logoutButton}>Cerrar Sesión</button>
                ) : (
                    <Link to="/signin" style={styles.link}>Iniciar Sesión</Link>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
