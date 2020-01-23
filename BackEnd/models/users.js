    const mongoose  = require('mongoose')
    const validator = require('validator')
    const bcrypt = require('bcryptjs')
    const jwt = require('jsonwebtoken')

    
    const userSchema = new mongoose.Schema({
        name : {
            type : String,
            required : true
        },
        email  : {
            type : String,
            required : true,
            unique:true,
            trim : true,
            lowercase : true,
            validate(value){
                if ( !validator.isEmail(value)){
                    throw new Error('Email is invalid !')
                }
            }
        },
        password : {
            type : String,
            required : true,
            minlength : 7,
            trim : true,
            validate(value) {
                if(value.toLowerCase().includes('password')){
                    throw new Error('Password can\'t contain "password" ')
                }
            }
        },
        tokens:[{
            token:{
                type : String,
                required : true
            }
        }],
        avatar : {
            type : Buffer
        },
        resetCode : {
            type : String
        }
    }, {
        timestamps : true
    })
    userSchema.methods.toJSON = function(){
        const user = this
    
        userObject = user.toObject() 
        delete userObject.password
        delete userObject.tokens
        return userObject
    }
    userSchema.methods.generateAuthToken = async function(){
        const user = this
        const token = jwt.sign({ _id : user._id.toString()},process.env.JWT_SECRET)
        user.tokens = user.tokens.concat({token : token})
        return token
    }

    userSchema.statics.findByIdAndEmail = async (email, password)=>{
        const user = await User.findOne({email : email})
        if(!user){
            throw new User('Unable To Login.')
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            throw new Error('Unable To Login')
        }

        return user
    }
    userSchema.pre('save',async function(next) {
        const user = this
        console.log('before saving')
        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password, 8)
        }
        next()
    })
    const User =mongoose.model('User' , userSchema)

    module.exports = User