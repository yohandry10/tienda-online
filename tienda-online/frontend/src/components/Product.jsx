  import React from 'react';
  import { Link } from 'react-router-dom';

  // Estilos en línea actualizados para el componente Product.
  const styles = {
    container: {
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '8px', // Mantenemos el padding reducido
      margin: '4px', // Reducimos aún más el margen para que estén más juntos
      width: '340px', // Incrementamos el ancho del contenedor
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    image: {
      width: '100%', // La imagen llena el ancho del contenedor
      height: '340px', // Incrementamos la altura de la imagen
      objectFit: 'cover', // Mantiene las proporciones de la imagen
      borderRadius: '4px', // Bordes redondeados
    },
    button: {
      display: 'none', // El botón sigue oculto
    },
  };

  const Product = ({ product }) => {
    if (!product) return null;

    return (
      <div style={styles.container}>
        <Link to={`/products/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={styles.image}
          />
        </Link>
        {/* Solo la imagen es visible, el resto del contenido ha sido eliminado */}
      </div>
    );
  };

  export default Product;
