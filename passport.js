const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/userModel');


const cookieExtractor = req =>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}

// authorization 
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : `${process.env.JWT_SECRET}`
}, async (payload,done)=>{
   try{
        await User.findById({_id : payload.sub},(err,user)=>{
            if(err)
                return done(err,false);
            if(user)
                return done(null,user);
            else
                return done(null,false);
        });
   } catch(err){
    res.status(500).json({message: {
        errMsg: "something went wrong",
        errBdy: true}});
  }
}));

// authenticated local strategy using username and password
passport.use(new LocalStrategy(async (username,password,done)=>{
    try {
        await User.findOne({username},(err,user)=>{
            // something went wrong with database
            if(err){
                return done(err);
            }    
            // if no user exist
            if(!user) {
                return done(null,false);
            }   
            // check if password is correct
            user.comparePassword(password,done);      
        });
    }catch(err){
        res.status(500).json({message: {
            errMsg: "something went wrong",
            errBdy: true}});
      }
    
}));