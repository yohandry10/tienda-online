const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Puedes agregar más campos según sea necesario
});

module.exports = mongoose.model('User', userSchema);
