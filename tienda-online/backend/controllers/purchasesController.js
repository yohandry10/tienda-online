const Product = require('../models/Product');

exports.makePurchases = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Stock no disponible para la cantidad solicitada" });
    }

    product.stock -= quantity;
    await product.save();

    // Procede a finalizar la compra aquí...
    
    res.status(200).json({ message: "Compra realizada con éxito", product });
  } catch (error) {
    res.status(500).json({ message: "Error al realizar la compra", error: error });
  }
};
