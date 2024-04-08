import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/img/carrito1.png';

import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';

const NavBar = ({ totalCartItems }) => {
    const { currentUser, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

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
    };

    const handleSearch = (event) => {
        event.preventDefault();
        // Aquí se agrega la lógica de búsqueda y redirección
        const normalizedSearchTerm = searchTerm.trim().toLowerCase();
        switch(normalizedSearchTerm) {
            case "televisores":
                navigate("/category/televisores");
                break;
            case "moda mujeres":
                navigate("/category/moda-mujeres");
                break;
            case "moda hombres":
                navigate("/category/moda-hombres");
                break;
            case "niños":
            case "ninos": // Por si se escribe sin la tilde
                navigate("/category/ninos");
                break;
            case "deportes":
                navigate("/category/deportes");
                break;
            default:
                alert("Categoría no encontrada"); // O cualquier otro manejo de búsqueda no encontrada
        }
    };

    return (
        <Navbar expand="lg" className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img src={logo} alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <NavDropdown title="Categorías" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/category/televisores">Televisores</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/category/moda-mujeres">Moda Mujeres</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/category/moda-hombres">Moda Hombres</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/category/ninos">Niños</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/category/deportes">Deportes</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSearch}>
                        <FormControl
                            type="search"
                            placeholder="Buscar"
                            className="me-2"
                            aria-label="Buscar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="outline-success" type="submit">Buscar</Button>
                    </Form>
                    <Nav className="ms-auto">
                        {currentUser && <Nav.Link as={Link} to="/admin">Admin</Nav.Link>}
                        <Nav.Link as={Link} to="/cart">🛒 Carrito ({totalCartItems})</Nav.Link>
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
