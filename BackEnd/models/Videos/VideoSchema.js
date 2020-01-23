const mongoose = require('mongoose');
const videoschema = mongoose.Schema({
    heading :{
        type:String,
        required :true
    },
    description : {
        type : String,
        required: true
    },
    image : {
        type : String,
        required : true
    },
    date: {
        type : Date,
        default : Date.now
    },
   
    videoSource:{
        type : String,
        required: true
    },
    likesCount:{
        type : Number,
        default : 0
    },
    comments :[{
        name :
        {
            type:String,
            required : true
        },
        email :
        {
            type:String,
            required : true
        },
        message :{
            type:String,
            required : true
        },
        subComment :[{
            name :
            {
                type:String,
                required : true
            },
            email:{
                type:String,
                required : true
            },
            subMessage :
            {
                type:String,
                required : true
            },
            date: {
                type : Date,
                default : Date.now
            },
        }],
        date: {
            type : Date,
            default : Date.now
        },
        subCommentsLikes:{
            type:Number,
            default:0
        }

    }]
    
})

module.exports = mongoose.model('videoSchema',videoschema);//'videoschema'=database name.