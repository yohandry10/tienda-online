const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  // Puedes añadir más campos según sea necesario
});

module.exports = mongoose.model('Product', productSchema);
