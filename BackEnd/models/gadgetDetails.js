
const mongoose = require('mongoose');
const gadgetSchema = mongoose.Schema({
    heading :{
        type:String,
        required :true
    },
    image : {
        type : String,
        required : true
    },

    date: {
        type : Date,
        default : Date.now
    },
    description : {
        type : String,
        required: true
    },
    // like :[{
    //     name:{
    //         type:String,
    //         required:true
    //     },
    //     email :{
    //         type:String,
    //         required:true
    //     },
    //    date :{
    //        type:Date,
    //        default : Date.now
    //    },
    //    isLiked :{
    //        type : Boolean,
    //        default : false
    //    }
    // }],
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

module.exports = mongoose.model('gadgetDetails',gadgetSchema);//craete an schema and set it in mongoDb with gadgetSchema name.