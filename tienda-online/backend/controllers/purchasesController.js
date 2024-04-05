const Product = require('../models/Product');

// Asumiendo que el cuerpo de la solicitud contiene un array de productos con sus respectivas cantidades
exports.makePurchases = async (req, res) => {
  const items = req.body.items; // Cambiar `items` según la estructura de tu solicitud

  // Validar que items es un array
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "La solicitud debe incluir un array de ítems." });
  }

  try {
    // Iterar sobre cada ítem y verificar el stock
    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Producto no encontrado con ID: ${item.productId}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Stock no disponible para la cantidad solicitada del producto con ID: ${item.productId}` });
      }

      // Actualizar el stock del producto
      product.stock -= item.quantity;
      await product.save();
    }

    // Si todas las actualizaciones de stock son exitosas
    res.status(200).json({ message: "Compra realizada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al realizar la compra", error: error });
  }
};
