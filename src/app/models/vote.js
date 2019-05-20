const mongoose = require('../../database');

const VoteSchema = new mongoose.Schema({
  started: {
    type: Boolean,
    require: false,
  },  
});

const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;