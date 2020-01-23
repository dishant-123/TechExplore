const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    userName :{
        type:String,
        required :true
    },
    email : {
        type : String,
        required: true
    } ,
    password : {
        type : String,
        required : true
    },
    state :{
        type : 'String'
     },
    rePassword : {
        type : String,
        required : true
    },
    date: {
        type : Date,
        default : Date.now
    },
    age : {
        type : Number
    },
    city:{
        type : String
    },
    address : {
        type : String
    },
    resetCode :{
        type : String,
    }
})

module.exports = mongoose.model('userDetails',PostSchema);//craete an schema and set it in mongoDb with Posts name.