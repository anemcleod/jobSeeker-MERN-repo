const userRouter = require('express').Router();
const User = require('../models/userModel');
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const JobBoard = require("../models/jobboardModel");
const Job = require("../models/jobModel");
const response = require('./utils/response');

require('dotenv').config();

let secret = process.env.JWT_SECRET;

const signToken = userID =>{
    return JWT.sign({
        iss : "Jobseeker",
        sub : userID
    },secret ,{expiresIn : "24h"});
}

userRouter.post('/signup', async function(req, res){
    try {
        const {username, password, checkPassword, displayName} = req.body;
        
        if(!username || !password || !checkPassword){
            response(res, 406, true, "Not all fields have been entered");
            return;
        }
        if(password.length < 5){
            response(res, 406, true, "Password must be at least 5 characters");
            return;
        }

        if(password !== checkPassword){
            response(res, 406, true, "Password and check password does not match");
            return;
        }

        const existingUser = await User.findOne({username: username});
        if(existingUser){
            response(res, 406, true, "This user alreay exists");
            return;
        } else {
            const newUser = new User({
                username,
                password,
                displayName
            });
            
            await newUser.save(err => {
                if(err){
                    response(res, 500, true, "Error has occured");
                } else {
                    response(res, 201, true, "This user alreay exists");
                }
            });   
        }
    } catch (err){
        response(res, 500, true, "Something went wrong");
      }
});

userRouter.post('/login',passport.authenticate('local',{session : false}),(req,res)=>{
    if(req.isAuthenticated()){
       const {_id, username, displayName, initial} = req.user;
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
      res.status(200).json({deleted: deletedUser, user:{username : "", displayName : "", initial : ""}, message : {msgBody: "We're sorry to see you go!", msgError: false}});
    } catch (err) {
        response(res, 500, true, err.message);
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
                response(res, 500, true, err.message);
            else{
                req.user.jobBoards.push(jobBoard);
                await req.user.save(err=>{
                    if(err)
                    response(res, 500, true, err.message);
                    else
                        res.status(200).json({message : {msgBody : "Successfully created jobBoard", msgError : false},
                        id :  jobBoard._id});
                });
            }
        })
    }catch(err) {
        response(res, 500, true, err.message);
    }
});

userRouter.put("/jobBoard/:jobBoardId", passport.authenticate('jwt',{session : false}), async (req, res) => {
    try {
        await JobBoard.findOneAndUpdate({_id: req.params.jobBoardId}, {title: req.body.title}, {new: true}, (err, doc) => {
            if(!err){
                response(res, 200, false, 'job board updated');
            }
        });      
    } catch (err) {
        response(res, 500, true, err.message); 
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
      res.status(200).json({
                            deleted:deletedJobBoard,
                            updated:UpdatedUser,
                            message : {
                                msgBody: 'board deleted', 
                                msgError: false} 
                            });
    } catch (err) {
        response(res, 500, true, err.message);
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
                response(res, 500, true, err.message);
            } else {
                const jobBoard = await JobBoard.findById(job.jobBoardId);
                jobBoard.jobs.push(job);
                await jobBoard.save(err=>{
                    if(err)
                    response(res, 500, true, err.message);
                    else
                        res.status(200).json({message : {msgBody : "Successfully created job", msgError : false},
                                              id: job._id});
                });
            }
        })

    } catch (err) {
        response(res, 500, true, err.message);
    }
});

userRouter.put("/jobs/:jobId", passport.authenticate('jwt',{session : false}), async (req, res) => {
    try {
        await JobBoard.findOneAndUpdate({_id: req.body.oldJobBoardId}, { "$pull": {  "jobs": req.params.jobId } }, { multi: true });
        await Job.findOneAndUpdate({_id: req.params.jobId}, {jobBoardId: req.body.newJobBoardId}, {new: true}, async (err, doc) => {
            if(err){
                response(res, 500, true, err.message);
            } else{
                const jobBoard = await JobBoard.findById(doc.jobBoardId);
                jobBoard.jobs.splice(req.body.destinationIndex, 0, doc);
                await jobBoard.save(err=>{
                    if(err) {
                        response(res, 500, true, err.message);
                    }    
                    else {
                        response(res, 200, false, "Successfully moved job");
                    }
                })
            }

        });
        
    } catch (err) {
        response(res, 500, true, err.message);
    }
  });

userRouter.delete("/jobs/:jobId", passport.authenticate('jwt',{session : false}), async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        const updatedJobBoard = await JobBoard.findOneAndUpdate({"_id": job.jobBoardId}, { "$pull": {  "jobs": req.params.jobId } }, { multi: true });
        const deletedJob = await Job.findByIdAndDelete(req.params.jobId);
        res.status(200).json({
            deletedJob: deletedJob,
            updatedJobBoard: updatedJobBoard,
            message: {
            msgBody: 'job deleted', 
            msgError: false
            }
    });
    } catch (err) {
        response(res, 500, true, err.message);
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
        response(res, 500, true, err.message);
    }   
});

module.exports = userRouter;