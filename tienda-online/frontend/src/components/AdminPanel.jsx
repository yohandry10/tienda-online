import React, { useState } from 'react';
import { db } from '../firebase-config';

const AdminPanel = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productImage, setProductImage] = useState('');

    const handleAddProduct = async (e) => {
        e.preventDefault();

        try {
            await db.collection('products').add({
                name: productName,
                description: productDescription,
                price: parseFloat(productPrice),
                category: productCategory,
                image: productImage,
            });
            alert('Producto agregado con éxito');
            // Limpiar los campos después de agregar el producto
            setProductName('');
            setProductDescription('');
            setProductPrice('');
            setProductCategory('');
            setProductImage('');
        } catch (error) {
            console.error('Error adding product: ', error);
            alert('Error al agregar el producto');
        }
    };

    return (
        <div>
            <h2>Panel de Administración</h2>
            <h3>Agregar Producto</h3>
            <form onSubmit={handleAddProduct}>
                <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Descripción del producto"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Precio del producto"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Categoría del producto"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="URL de la imagen del producto"
                    value={productImage}
                    onChange={(e) => setProductImage(e.target.value)}
                    required
                />
                <button type="submit">Agregar Producto</button>
            </form>
            {/* Aquí podrías agregar más formularios para editar o eliminar productos */}
        </div>
    );
};

export default AdminPanel;
