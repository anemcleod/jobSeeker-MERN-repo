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
            res.status(406).json({message: {
                                    msgBody: "Not all fields have been entered",
                                    msgError: true}});
            return;
        }
        if(password.length < 5){
            res.status(406).json({message: {
                msgBody: "Password must be at least 5 characters",
                msgError: true}});
            return;
        }

        if(password !== checkPassword){
            res.status(406).json({message: {
                msgBody: "Password and check password does not match",
                msgError: true}});
            return;
        }

        const existingUser = await User.findOne({username: username});
        if(existingUser){
            res.status(406).json({message: {
                msgBody: "This user alreay exists",
                msgError: true}});
            return;
        } else {
            const newUser = new User({
                username,
                password,
                displayName
            });
            
        await newUser.save(err => {
            if(err){
                res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
            } else {
                res.status(201).json({message : {msgBody : "Account successfully created", msgError: false}});
            }
        });
            
           
        }


    } catch (err){
        res.status(500).json({message: {
            msgBody: "Something went wrong",
            msgError: true}});
      }
    
    
});

userRouter.post('/login',passport.authenticate('local',{session : false}),(req,res)=>{
    if(req.isAuthenticated()){
       const {_id,username, displayName, initial} = req.user;
       const token = signToken(_id);
       res.cookie('access_token',token,{httpOnly: true, sameSite:true}); 
       res.status(200).json({isAuthenticated : true, user : {username, displayName, initial}});
    } 
});

userRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token',{httpOnly: true, sameSite:true});
    res.json({user:{username : "", displayName : "", initial : ""},success : true});
});

userRouter.delete("/delete", passport.authenticate('jwt',{session : false}), async (req, res) => {
    try {
      const user = await User.findById(req.user);
      const jobBoards = user.jobBoards;

      for (board of jobBoards) {
          await Job.deleteMany({ jobBoardId: board});
          await JobBoard.findByIdAndDelete(board);
      }
      const deletedUser = await User.findByIdAndDelete(req.user);
      res.status(200).json({deleted: deletedUser, user:{username : "", displayName : "", initial : ""}, message : {msgBody: "We're sorry to see you go", msgError: false}});
    } catch (err) {
      res.status(500).json({message : {msgBody: err.message, msgError: true}});
    }
  });

  userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {username, displayName, initial} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username : username, displayName : displayName, initial : initial}});
});




//====================jobBoard routes==========================//

userRouter.post('/jobBoard',passport.authenticate('jwt',{session : false}), async (req,res)=>{
    try {
        const jobBoard = new JobBoard(req.body);
        await jobBoard.save( async err=>{
            if(err)
                res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
            else{
                req.user.jobBoards.push(jobBoard);
                await req.user.save(err=>{
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

userRouter.delete("/jobBoard/:jobBoardId", passport.authenticate('jwt',{session : false}), async (req, res) => {
    try {
      const jobBoard = await JobBoard.findById(req.params.jobBoardId);
      const jobs = jobBoard.jobs;

      for(job of jobs){
          await Job.findByIdAndDelete(job);
      }

      const deletedJobBoard = await JobBoard.findByIdAndDelete(req.params.jobBoardId);
      const UpdatedUser = await User.updateOne({"_id" : req.user } ,{ "$pull": {  "jobBoards": req.params.jobBoardId } }, { multi: true });
      res.json(deletedJobBoard).json(UpdatedUser);
    } catch (err) {
      res.status(500).json({message : {
          msgBody: err.message, 
          msgError: true}});
    }
  });

// =========================== job routes ============================== //

userRouter.post("/jobs", passport.authenticate('jwt',{session : false}), async (req, res) =>{
    try{
        const { jobBoardId, title, company, location, description, link, date, contract } = req.body;
        const job = new Job({
                                jobBoardId, 
                                title, 
                                company, 
                                location, 
                                description, 
                                link, 
                                date, 
                                contract
                            });
        await job.save(async (err) => {
            if(err){
                res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
            } else {
                const jobBoard = await JobBoard.findById(job.jobBoardId);
                jobBoard.jobs.push(job);
                await jobBoard.save(err=>{
                    if(err)
                        res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                    else
                        res.status(200).json({message : {msgBody : "Successfully created job", msgError : false}});
                });
            }
        })

    } catch (err) {
        res.status(500).json({message: {
            msgBody: err.message, 
            msgError: true
        }})
    }
});

userRouter.delete("/jobs/:jobId", passport.authenticate('jwt',{session : false}), async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        const updatedJobBoard = await JobBoard.findOneAndUpdate({"_id": job.jobBoardId}, { "$pull": {  "jobs": req.params.jobId } }, { multi: true });
        const deletedJob = await Job.findByIdAndDelete(req.params.jobId);
        res.json(deletedJob).json(updatedJobBoard);
    } catch (err) {
        res.status(500).json({message: {
            msgBody: err.message, 
            msgError: true
        }})
    }   
});

userRouter.get("/jobs", passport.authenticate('jwt',{session : false}), async (req, res) => {
    try {
        const jobs = await User.findById(req.user).populate({
            path: 'jobBoards',
            populate: {path: 'jobs'}
        });
        res.status(200).json(jobs);
    }catch (err) {
        res.status(500).json({message: {
            msgBody: err.message, 
            msgError: true
        }})
    }   
});

module.exports = userRouter;