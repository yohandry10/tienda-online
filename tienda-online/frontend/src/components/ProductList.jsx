import React, { useState, useEffect } from 'react';
import Product from './Product';
import fetchProducts from '../services/ProductService';
import '../index'; // Asegúrate de que la ruta al archivo CSS sea correcta

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(''); // Agregar estados para los filtros

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsFromServer = await fetchProducts();
        setProducts(productsFromServer);
        setFilteredProducts(productsFromServer); // Inicializar filteredProducts con todos los productos
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    getProducts();
  }, []);

  // Función para manejar cambios en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterProducts(event.target.value, categoryFilter);
  };

  // Función para manejar cambios en el filtro de categoría
  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
    filterProducts(searchTerm, event.target.value);
  };

  // Función para filtrar productos por término de búsqueda y categoría
  const filterProducts = (searchTerm, categoryFilter) => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (categoryFilter) {
      filtered = filtered.filter((product) =>
        product.category.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="container product-list">
      {/* Componente de búsqueda */}
      <input
        type="text"
        className="searchInput" // Clase CSS aplicada aquí
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* Control de filtrado por categoría */}
      <select
        className="searchSelect" // Clase CSS aplicada aquí
        value={categoryFilter}
        onChange={handleCategoryChange}
      >
        <option value="">Todas las categorías</option>
        {/* Aquí podrías generar las opciones de categorías dinámicamente si lo deseas */}
        <option value="Categoría 1">Categoría 1</option>
        <option value="Categoría 2">Categoría 2</option>
      </select>

      {/* Mostrar productos filtrados */}
      {filteredProducts.map((product) => (
        <Product key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;
