const mongoose = require('mongoose');
const admin = mongoose.Schema({
    
    email:{
        type:String,
        required:true
    },
    name : {
        type:String,
        required:true
    },
    date:{
        type:Date,
        default : Date.now
    }
});
module.exports = mongoose.model('admin',admin);