const userRouter = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');



userRouter.post('/signup', async function(req, res){
    try {
        const {username, password, checkPassword, displayName} = req.body;
        
        if(!username || !password || !checkPassword){
            res.status(401).json({message: {
                                    errMsg: "not all fields have been entered",
                                    errBdy: true}});
        }
        if(password.length < 5){
            res.status(401).json({message: {
                errMsg: "password must be at least 5 characters",
                errBdy: true}});
        }

        if(password !== checkPassword){
            res.status(401).json({message: {
                errMsg: "Password and check password does not match",
                errBdy: true}});
        }

        const existingUser = await User.findOne({username: username});
        if(existingUser){
            res.status(401).json({message: {
                errMsg: "This user alreay exists",
                errBdy: true}});
        }

        const newUser = new User({
            username: username,
            password: password,
            displayName: displayName
        });
        
        const savedUser = await newUser.save();
        res.json(savedUser);
       

    }catch (err){
        res.status(500).json({message: {
            errMsg: "something went wrong",
            errBdy: true}});
      }
    
    
})

module.exports = userRouter;