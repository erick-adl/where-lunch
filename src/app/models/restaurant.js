const mongoose = require('../../database');

const RestaurantSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type:String,
        required:true,
    },
    votes:{
        type:Number,
        required:true,        
    },
    createAt:{
        type:Date,
        default: Date.now,
    }

});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;