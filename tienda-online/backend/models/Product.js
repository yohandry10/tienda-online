const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0 // Asegura que el stock no sea negativo.
  }
});

productSchema.index({ category: 1, price: -1 });

module.exports = mongoose.model('Product', productSchema);
