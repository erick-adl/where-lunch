const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const VoteSchema = new mongoose.Schema({
  started: {
    type: Boolean,
    require: true,
  },
  lastStart: {
    type: Date,    
  },  
});

const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;