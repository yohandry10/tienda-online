// src/services/productService.js

const fetchProducts = async () => {
    const url = "/products.json"; // O la URL de tu API
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error fetching products:', response.status);
      }
      const products = await response.json();
      return products;
    } catch (error) {
      console.error(error);
    }
  };
  
  export default fetchProducts;
  