const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // Asumiendo que el nombre es obligatorio
  },
  description: {
    type: String,
    required: true // Asumiendo que la descripción es obligatoria
  },
  price: {
    type: Number,
    required: true // Asumiendo que el precio es obligatorio
  },
  category: {
    type: String,
    required: true, // Añadido el campo categoría como obligatorio
    index: true // Añadiendo índice para mejorar la eficiencia de las consultas por categoría
  }
});

// Opcional: Índice compuesto si planeas realizar búsquedas frecuentes que involucren ambas, categoría y precio.
productSchema.index({ category: 1, price: -1 });

module.exports = mongoose.model('Product', productSchema);
