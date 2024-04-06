import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/img/carrito1.png'; // Asume que el directorio 'assets' está dentro de 'src'

import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img//nav-icon3.svg';

const NavBar = ({ totalCartItems }) => {
    const { currentUser, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    async function handleLogout() {
        try {
            await logout();
            console.log("Has cerrado sesión con éxito");
            navigate('/signin');
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    }

    return (
        <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img src={logo} alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        {currentUser && <Nav.Link as={Link} to="/admin">Administrador de compras</Nav.Link>}
                        <Nav.Link as={Link} to="/cart">
                            🛒 Carrito ({totalCartItems})
                        </Nav.Link>
                        {currentUser ? (
                            <Nav.Link onClick={handleLogout}>Cerrar Sesión</Nav.Link>
                        ) : (
                            <Nav.Link as={Link} to="/signin">Iniciar Sesión</Nav.Link>
                        )}
                    </Nav>
                    <div className="social-icon">
                        <Link to="#"><img src={navIcon1} alt="" /></Link>
                        <Link to="#"><img src={navIcon2} alt="" /></Link>
                        <Link to="#"><img src={navIcon3} alt="" /></Link>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
