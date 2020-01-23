const mongoose = require('mongoose')
const signUpVarifyOTP = new mongoose.Schema({
    email : {
        type : String,
        required  : true
    },
    OTP : {
        type : Number,
        required : true
    },
})
module.exports = mongoose.model('signusersOtp', signUpVarifyOTP)