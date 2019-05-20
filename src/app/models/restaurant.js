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
    default: 0,
  },  
  canVote: {
    type: Boolean,
    required: false,
    select: true,
    default: true,
  },
  lastSelectedDay: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;