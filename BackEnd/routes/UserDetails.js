const express = require('express')
const router = express.Router();
const userDetails = require('../models/Post');
var Cryptr = require('cryptr');
cryptr = new Cryptr('devnami');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
// GET ALL THE POSTS
router.get('/', async (req, res) =>{
    try {
        const detailsOfUser = await userDetails.find();
        res.json(detailsOfUser); 
        
    }
    catch (err){
        res.json({message : err});
    }
})
async function mailSender(details,msg){
    var nodemailer = require('nodemailer');
   var transporter = nodemailer.createTransport({
       service:'gmail',
       auth :{
           user : process.env.email,
           pass :  process.env.password
       }
   });
   var mailOptions ={
       from : '"Tech Explore"<dishant9812dua@gmail.com>',
       to : details.email,
       subject : "Welcome To Tech Explore",
       html : `<h1>Thanks ${details.userName} for Joining us.</h1>` + `<p>${msg}<p>`
   };
   const info =  await transporter.sendMail(mailOptions);
   return info;

}
//SUBMIT THE POST

router.post('/signUp/verify', async (req,res) => {
    if(finalCodeSent != req.body.code){
        return res.json({
            message : 'Verify code Not Match Please Enter The Correct Code.'
        })
    }
       const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
        if(!hashPassword){
            console.log('Please try another password');   
        }
    const detailsOfUser = new userDetails ({
        userName : req.body.userName,
        email: req.body.email,
        password : hashPassword,
        rePassword : hashPassword,
    });
        const savedPost = await userDetails.create(detailsOfUser);
        if(savedPost){
            mailSender(detailsOfUser,' We are glad you are here. We promise we provides you latest technology news. stay tuned...aloat of Content is Coming Soon..').catch(error =>console.log(error));
            return res.json({
                message: 'You Sign Up SuceessFully!!',
                user : detailsOfUser
            });
        }
        else{
            return res.json({
                message : 'Something Went Wrong Please Try Again After sometime',
            })
        }
});
router.post('/signUp/sendCode', async (req,res) => {
    var userFind = await userDetails.findOne({email:req.body.email});
    //console.log(userFind);
    if(userFind){
        return res.json({
            message:'You are Already SignUp.'
        });
    }
    else{
        const codeSent = Math.floor(Math.random() * 1000000);
        finalCodeSent = codeSent;
        const sentEmail ={
            userName : req.body.userName,
            email : req.body.email
        }
        mailSender(sentEmail,`Your Confirmation Code is ${codeSent}`).catch(error => console.log(error));
        return res.json({
            message : 'Succesfully',
            user : sentEmail,
        });
    }
});
router.post('/resetPassword/sendCode', async(req,res) =>{
    // console.log('hello')
    const detailsOfUser = await userDetails.findOne({email:req.body.email});
    if(!detailsOfUser){
        return res.json({
            message : 'The Email is not registered.'
        });
    }
    const codeSent = Math.floor(Math.random() * 1000000);
    const updatedResetCode = await userDetails.updateOne(
        { email : detailsOfUser.email },
        { $set : { resetCode : codeSent } }
    );
     const info = mailSender(detailsOfUser,`Your Security Code for Password Reset is ${codeSent} Please don't share this code with any one.`).catch(error => console.log(error));
    if(info){
        return res.json({
            message : 'verify Code sent Successfilly.',
            user : detailsOfUser
        })
    }
})
router.get('/resetPassword/checkCode:postId' , async(req,res) =>{
        if(finalCodeSent === req.params.postId){
    
            const updatedPost = await Post.updateOne(
                { email : req.body.email },
                { $set : { password : req.body.password } }
            );
            if(updatedPost){
                return req.json({
                    message : 'password Changed SuccessFully.',
                    user : userDetails
                })
            }
            else{
                return req.json({
                    message : 'Something Went Wrong Please Try Again Later.',
                })
            }
    }
    else{
        return req.json({
            message : 'Code Not Match.',
        }) 
    }
});

router.get('/me/:email',async(req, res)=>{
    try {
        const user = await userDetails.findOne({email : req.params.email})
        if(!user){
            throw new Error()
        }
        const finalUser = user.toObject()
        delete finalUser.password;
        delete finalUser.rePassword;
        return res.send({user : finalUser})
    }catch(e){
            return res.status(400).send()
    }
    
})
router.post('/resetPassword/verifyCode', async (req,res) => {
    var userFind = await userDetails.findOne({email:req.body.email});
    if(req.body.resetCode === userFind.resetCode){
        return res.json({
            message : 'reset Code Verified',
            user:userFind
        })
    }
    else{
        return res.json({
            message : 'Reset Code Not Match'
        })
    }
});
router.post('/login', async(req,res) =>{
        //console.log(req.body);
        const detailsOfUser = await userDetails.findOne({email:req.body.email});
       
       if(!detailsOfUser){
           return res.json({
               message:'No User with that email found'
           })
       }
       else{
            comparePassword = await bcrypt.compare(req.body.password, detailsOfUser.password);
            // console.log(comparePassword);
            if(comparePassword == false){
                return res.json({
                    message:'email and password do not match'
                })
            }
            else{
                const user = {
                    userName : detailsOfUser.userName,
                    email : detailsOfUser.email
                }
                return res.json({
                    message:'Login Successfull',
                    user:user
                })
            }
        //    if(req.body.password ===  detailsOfUser.password){
        //        return res.json({
        //            message:'Login Successfull',
        //            user:detailsOfUser
        //        })
        //    }else{
        //        return res.json({
        //            message:'email and password do not match'
        //        })
        //    }
       }
    
    

});
//DELETE THE POST..
router.delete ('/:postId',async (req,res) =>{
    try{
        const detailsOfUser = await Post.remove({_id : req.params.postId});//mongodb CRUD operation
        res.json(detailsOfUser);
    }
    catch(err){
        res.json({message:err});
    }
})
//UPDATE A POST..
router.post('/resetPassword/updatePassword',async (req,res) => {
        const updatePassword = await userDetails.updateOne(
        { email : req.body.email },
        { $set : { password : req.body.password } }
    );
    return res.json({
        message : 'Update Password Succesfully'
    })
});
router.patch('/:postId',async (req,res) =>{
    try {
        const updatedPost = await Post.updateOne(
            { _id : req.params.postId },
            { $set : { password : req.body.password } }
        );
        res.json(updatedPost);
    }
    catch(err){
        res.json({message:err});
    }
});

router.patch('/update/me',(req, res)=>{
    try {
        
        // const updatePassword = await userDetails.updateOne(
        //     { email : req.body.email },
        //     { $set : { password : req.body.password,age : req.body.age } }
        // );

    }catch(e){
        res.status(400).send()
    }
})
module.exports = router;