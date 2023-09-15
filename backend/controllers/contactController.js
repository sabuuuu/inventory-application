const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const sendEmail = require('../utiles/sendEmail');

const contactUs = asyncHandler(async (req, res, next) => {
    const {subject,message} = req.body;
    const user= await User.findById(req.user.id);

    if(!user){
        res.status(404);
        throw new Error('User not found');
    }

    //validation
    if(!subject || !message){
        res.status(400);
        throw new Error('Please add subject and message');
    }

    const send_to = process.env.EMAIL_USER;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = user.email;
    try{
        await sendEmail(subject,message,send_to,sent_from,reply_to);
        res.status(200).json({sucess:true,message :'Message sent'});
    }catch (error){
        res.status(500);
        throw new Error('Email not sent');
    }
})

module.exports = {
    contactUs
}