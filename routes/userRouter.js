const userRouter = require('express').Router();
const User = require('../models/userModel');
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const JobBoard = require("../models/jobboardModel");
const Job = require("../models/jobModel");



const signToken = userID =>{
    return JWT.sign({
        iss : "Jobseeker",
        sub : userID
    },"haha",{expiresIn : "24h"});
}

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
        } else {
            const newUser = new User({
                username,
                password,
                displayName
            });
            
            const savedUser = await newUser.save();
            res.json(savedUser);
           
        }


    } catch (err){
        res.status(500).json({message: {
            errMsg: "something went wrong",
            errBdy: true}});
      }
    
    
});

userRouter.post('/login',passport.authenticate('local',{session : false}),(req,res)=>{
    if(req.isAuthenticated()){
       const {_id,username} = req.user;
       const token = signToken(_id);
       res.cookie('access_token',token,{httpOnly: true, sameSite:true}); 
       res.status(200).json({isAuthenticated : true, user : {username}});
    }
});

userRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');
    res.json({user:{username : ""},success : true});
});

userRouter.get('/test',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.json({message: "works"});
});



//====================jobBoard routes==========================//

userRouter.post('/jobBoard',passport.authenticate('jwt',{session : false}), async (req,res)=>{
    try {
        const jobBoard = new JobBoard(req.body);
        await jobBoard.save(err=>{
            if(err)
                res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
            else{
                req.user.jobBoards.push(jobBoard);
                req.user.save(err=>{
                    if(err)
                        res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                    else
                        res.status(200).json({message : {msgBody : "Successfully created jobBoard", msgError : false}});
                });
            }
        })
    } catch (err){
        res.status(500).json({message: {
            errMsg: "something went wrong",
            errBdy: true}});
      }
    
   
});


module.exports = userRouter;