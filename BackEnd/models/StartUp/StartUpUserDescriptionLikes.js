const mongoose = require('mongoose');
const userLikesSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email :{
        type : String,
        required :  true
    },
    descriptionLikes:
    [
        {
            id : {
                type : String,
                required : true
            }
        }
    ]
});
module.exports = mongoose.model('startupUserDescriptionLikes',userLikesSchema);