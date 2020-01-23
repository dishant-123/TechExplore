const express = require('express')
const router = new express.Router()
const User = require('../models/users')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const usersOTP = require('../models/signUpVerifyOTP')
require('dotenv/config');
const {sendWelcomeEmail, sendCalcinationEmail, sendVerifyOTP, sendForgetPasswordOtp} = require('../email/account')
//not in real application but for practice

router.get('/users', auth,  async(req,res) =>{
    try{
        const user = await User.find({})
        return res.send(user)
    } catch(e){
        res.status(500).send(e)
    }
})

router.get('/users/me', auth , async(req,res)=>{
    res.send(req.user)
})


router.get('/users/:id', async(req,res) =>{
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
            if(!user){
            return res.status(404).send()
        }
        return res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
}) 

router.post('/users', async (req, res) => {
    try {
            const findUser =await usersOTP.findOne({ email : req.body.email })        
            if( !findUser || !req.body.code ){
                return res.status(404).send({errmsg : "Bad request"})
            }
            else if(findUser.OTP !== req.body.code){
                return res.status(404).send({errmsg : "Code Not Match!"})
            }

            const user = new User(req.body)
            await user.save()
            sendWelcomeEmail(user.email, user.name)
            const token = await user.generateAuthToken();
            // res.cookie('Authorization', token)
            return res.status(201).send({user, token})
    } catch (e) {
        return res.status(400).send(e)
    }
})
// router.post('/fake',async(req, res)=>{
//     // console.log(req.body)
//             const user = new User(req.body)
//             await user.save()
//             const token = await user.generateAuthToken();
//             res.send({user,token})
//             // res.send()
// })
router.post('/users/login',async (req, res)=>{
    try {
        console.log(req.headers)
        const user = await User.findByIdAndEmail(req.body.email, req.body.password)
        const token = await user.generateAuthToken();
        console.log(token)
        // console.log(req.headers)
        res.cookie('Authorization', {path : "/",signed:true, maxAge: 1000*60*60*24*7} ,token) ///for 24 hours
        res.send({user,token})
    }catch(e){
        return res.status(400).send()
    }
})
router.post('/users/logout',auth,  async(req ,res)=>{
    try{
            req.user.tokens = req.user.tokens.filter((singleToken)=>{
                return singleToken.token !== req.token 
            })
            await req.user.save()
            res.clearCookie('Authorization')
            res.send({msg : 'successful logout'})
    }catch(e){
        res.status(500).send()
    }
    res.send({msg : 'successful logout'})
})

router.post('user/checkcookie', auth, (req, res)=>{
    res.send()
},(error,  req, res ,next)=>{
    return res.status(400).send()
})

router.post('/users/logoutAll', auth, async(req, res)=>{
    console.log('LogoutAll')
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})
router.post('/userProfile', auth , (req, res)=>{
    res.send(req.user)
}, (error,  req, res ,next) =>{
    return res.status(400).send()
})
router.patch('/users/me', auth, async (req, res)=>{

    const updates = Object.keys(req.body)
    const allowsUpdates = ['name','email','password', 'avatar']
    const isValidOperaton = updates.every((update)=>allowsUpdates.includes(update))

    if(!isValidOperaton){
        return res.status(400).send({error : 'invalid operation'})
    }
    try{
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
         res.send(req.user)
    }catch(e){
        res.status(404).send(e)
    }
})

router.delete('/users/me', auth, async(req,res)=>{
    try{
        await req.user.remove()
        sendCalcinationEmail(req.user.email, req.user.name)
        res.send(req.user)
    }catch(e){
        res.status(400).send()
    }
})

const upload = multer({
     limits : {
         filesize : 1000000,
     },
     fileFilter(req, file, cb){
         if(!file.originalname.match(/\.(jpg|jpeg|:png)$/)){
             return cb(new Error('please upload an image'))
         }
         cb(undefined, true)
     }
})

router.post('/users/me/avatar', auth , upload.single('avatar'), async(req, res)=>{
    const buffer = await sharp(req.file.buffer).resize({width : 250, height : 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error,  req, res ,next) =>{ 
    res.status(400).send({error : error.message})
})

router.delete('/users/me/avatar', auth, async(req,res) =>{
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    },(error, req, res, next) =>{
        return res.status(400).send()
})

// router.post('/users',(req, res)=>{
//     console.log(req.body);
//     res.cookie('Abcd','defh');
//      res.send();
// })
router.post('/users/forgetpassword/sendcode', auth, async(req, res) =>{
    sendForgetPasswordOtp(req.user)
    // return res.send('Hello')
    res.send()
}), (error, req, res, next) =>{
    return res.send(400).send()
};
router.post('/user/forgetpassword/verifycode', auth , (req, res)=>{
    if(!req.user.resetCode || !req.body.code){
        return res.status(400).send()
    }
    if(req.user.resetCode === req.body.code){
        return res.send() //ok
    }
    return res.status(404).send()
},(error, req, res, next)=>{
    return res.send(400).send()
})

router.get('/users/:id/avatar',async (req,res) =>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)

    }catch(e){
        res.status(404).send() 
    }
})

router.post('users/signUp/sendCode', async (req,res) => {
    try{
            var userFind = await User.findOne({email : req.body.email});
            if(userFind){
                return res.status(404).send({
                    message:'You are Already SignUp.'
                });
               
            }
            
            sendVerifyOTP(req.body.email, req.body.name);
            return res.send({
                message : 'Succesfully',
            });
    } catch(e){
        res.status(500).send({errmsg : e})
    }
});


module.exports = router
