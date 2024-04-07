import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'; // Importa las nuevas funciones

const PurchaseManager = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'orders'));
                const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOrders(ordersData);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            const orderDoc = doc(db, 'orders', orderId); // Accede al documento específico
            await updateDoc(orderDoc, { status: newStatus }); // Actualiza el documento
            console.log(`Order ${orderId} status updated to ${newStatus}`);
            // Actualizar la lista de órdenes después de cambiar el estado
            setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div>
            <h2>Gestor de Compras</h2>
            <h3>Órdenes Recibidas</h3>
            {orders.length === 0 ? (
                <p>No se han recibido órdenes.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID de Compra</th>
                            <th>Nombre del Producto</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.productName}</td>
                                <td>{order.quantity}</td>
                                <td>${order.total.toFixed(2)}</td>
                                <td>{order.status}</td>
                                <td>
                                    {order.status !== 'Entregada' && (
                                        <button onClick={() => handleUpdateStatus(order.id, 'En proceso')}>
                                            Marcar como En Proceso
                                        </button>
                                    )}
                                    <button onClick={() => handleUpdateStatus(order.id, 'Entregada')}>
                                        ¡Entregada!
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PurchaseManager;
