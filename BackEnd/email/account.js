const sgmail = require('@sendgrid/mail')
// const API_KEY = process.env.SENDGRID_API_KEY
require('dotenv/config');
const API_KEY = process.env.SENDGRID_API_KEY
sgmail.setApiKey(API_KEY)
// const usersOTP = require('../models/signUpVerifyOTP')

const sendWelcomeEmail = (email, name)=>{
    sgmail.send({
        to : email,
        from : 'dishant9812dua@gmail.com',
        subject : `Thanks for joining in`,
        text : `Welcome ${name} in out Task App`
    })
}
const sendCalcinationEmail = (email, name)=>{
    sgmail.send({
        to : email,
        from : 'dishant9812dua@gmail.com',
        subject : `Sorry to see You Go!`,
        text : `Goodbye ${name} from youe Task App Hope we meet soon!`
    })
}
const sendVerifyOTP = async(email, name)=>{
        const codeSent = Math.floor(Math.random() * 1000000);
        const sentOtpUser = await usersOTP.findOne({email})
        if(!sentOtpUser){
            const newUser = new usersOTP({email :email, OTP : codeSent})
            await newUser.save()
        }
        sentOtpUser.OTP = codeSent
        await sentOtpUser.save()
        sgmail.send({
            to : email,
            from : 'dishant9812dua@gmail.com',
            subject : `TechExplore Varification Code !`,
            text : `Hi ${name} Your Confirmation Code is ${codeSent}`
        })
}
const sendForgetPasswordOtp = async(user)=>{
    const randomCode = Math.floor(Math.random() * 1000000);
    user.resetCode  = randomCode;
    await user.save()
    sgmail.send({
        to : user.email,
        from : 'dishant9812dua@gmail.com',
        subject : `TechExplore Forgot Password Code !`,
        text : `Hi ${user.name} Your forget Password Code is ${randomCode}`
    })
}
module.exports = {
    sendWelcomeEmail,
    sendCalcinationEmail,
    sendVerifyOTP,
    sendForgetPasswordOtp
}