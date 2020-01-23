const express = require('express')
const router = express.Router();
const contactDetails = require('../models/contactUs');
router.post('/',async (req,res)=>{
    const user ={
        name:req.body.name,
        email:req.body.email,
        message:req.body.message
    }
    let response = await contactDetails.create(user);
    if(response!=null){
        return res.json({
            message : 'SuccessFully upload ContactUs Message',
             user : user
        })
    }
    else{
        return res.json({message : 'Something went Wrong.'})
    }
})
module.exports = router