const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,        
    },
    password:{
        type:String,
        required:true,
        select:false,
    },    
    lastDayVote:{
        type:String,
        required:false,
        default: null,
    },
    createAt:{
        type:Date,
        default: Date.now,
    }

});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;