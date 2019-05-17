const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const RestaurantSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  votes: {
    type: Number,
    require: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;