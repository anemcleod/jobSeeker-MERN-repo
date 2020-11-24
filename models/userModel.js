const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    username: {type: String, rquired: true, unique: true},
    displayName: {type: String, default: "there"},
    password:  {type: String, rquired: true, minlength: 5},
    jobBoards: [{type: mongoose.Schema.Types.ObjectId, ref: "JobBoard"}]
});

userSchema.pre("save", function(next){
    if(!this.isModified){
        return next();
    }
    bcrypt.hash(this.password, 10, function(err, hashedPassword) {
        if(err){
            return next(err);
        }
        this.password = hashedPassword;
        next();
    });
});
module.exports = mongoose.model('User', userSchema);