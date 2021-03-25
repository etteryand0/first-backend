const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  name: String,
  price: Number,
});

module.exports = mongoose.model('Product', ProductSchema);