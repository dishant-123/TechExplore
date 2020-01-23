const User = require('../models/users')
const jwt = require('jsonwebtoken')
require('dotenv/config');
const auth = async(req, res, next) =>{
    try{
        // const token = req.header('Authorization').replace('Bearer ', '')
        // console.log(req.headers.cookie('Authorization'))
        // console.log(req.cookies.signedCookies)
        const cookie = req.headers.cookie.split(';')
        if(!cookie){
            throw new Error()
        }
        const token = cookie[0].replace('Authorization=','')
        // const token = cookie.find( (one) =>{one.match(/\(Authorization)$/)})
        console.log(token)
        if(!token){
            throw new Error()
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET) 
        console.log(decoded)
        const user = await User.findOne({_id : decoded._id, 'tokens.token' : token})
        // console.log(user)
        if(!user){
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    }   catch(e){
        res.status(401).send({error: 'PLease Authenticate.'})
    }
}

module.exports =auth