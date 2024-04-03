const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

/**
 * @openapi
 * /products:
 *   post:
 *     summary: Crea un nuevo producto
 *     description: Añade un nuevo producto al catálogo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Producto creado con éxito.
 */
router.post('/', productsController.createProduct);

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Obtiene todos los productos
 *     description: Devuelve una lista de todos los productos disponibles.
 *     responses:
 *       200:
 *         description: Una lista de productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   description:
 *                     type: string
 */
router.get('/', productsController.getAllProducts);

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Obtiene un producto específico por ID
 *     description: Devuelve detalles de un producto específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 description:
 *                   type: string
 *       404:
 *         description: Producto no encontrado.
 */
router.get('/:id', productsController.getProductById);

/**
 * @openapi
 * /products/{id}:
 *   put:
 *     summary: Actualiza un producto existente
 *     description: Actualiza los detalles de un producto existente por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto actualizado con éxito.
 *       404:
 *         description: Producto no encontrado.
 */
router.put('/:id', productsController.updateProduct);

/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     summary: Elimina un producto
 *     description: Elimina un producto específico por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado con éxito.
 *       404:
 *         description: Producto no encontrado.
 */
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
