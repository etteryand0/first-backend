const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  name: { type: String, required: true, maxLength: 50},
  price: { type: Number, required: true, min: 0 },
});

module.exports = mongoose.model('Product', ProductSchema);