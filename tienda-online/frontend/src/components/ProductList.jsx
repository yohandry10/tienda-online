import React, { useState, useEffect } from 'react';
import Product from './Product';
import fetchProducts from '../services/ProductService';
import '../index.css'; // Asegúrate de que la ruta al archivo CSS sea correcta

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsFromServer = await fetchProducts();
        setProducts(productsFromServer);
        setFilteredProducts(productsFromServer);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    getProducts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterProducts(event.target.value, categoryFilter);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
    filterProducts(searchTerm, event.target.value);
  };

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
    <div className="product-list-container">
      <div className="search-and-filter">
        <input
          type="text"
          className="searchInput"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          className="searchSelect"
          value={categoryFilter}
          onChange={handleCategoryChange}
        >
          <option value="">Todas las categorías</option>
          <option value="Categoría 1">Categoría 1</option>
          <option value="Categoría 2">Categoría 2</option>
        </select>
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
