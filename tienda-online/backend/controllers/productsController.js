const Product = require('../models/Product'); // Asegúrate de que la ruta sea correcta

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
 *       400:
 *         description: Error al crear el producto.
 */
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: "Error al crear el producto", error: error });
    }
};

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Obtiene todos los productos
 *     description: Devuelve una lista de todos los productos disponibles.
 *     responses:
 *       200:
 *         description: Una lista de productos.
 *       500:
 *         description: Error al obtener los productos.
 */
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los productos", error: error });
    }
};

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
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del producto.
 *       404:
 *         description: Producto no encontrado.
 */
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: "Producto no encontrado", error: error });
    }
};

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
 *       400:
 *         description: Error al actualizar el producto.
 */
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar el producto", error: error });
    }
};

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
 *       500:
 *         description: Error al eliminar el producto.
 */
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto", error: error });
    }
};
