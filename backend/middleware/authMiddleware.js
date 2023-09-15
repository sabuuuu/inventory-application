const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    try{
        const token = req.cookies.token;

        if(!token){
            res.status(401);
            throw new Error('Not authorized, please login');
        }

        //verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        //get user from token
        const user = await User.findById(verified.id).select('-password');

        if(!user){
            res.status(401);
            throw new Error('Not authorized, token failed');
        }

        req.user = user;
        next();
    }catch(err){
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
})

module.exports = protect