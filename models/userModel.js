const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    username: {type: String, rquired: true, unique: true},
    displayName: {type: String, default: "there"},
    password:  {type: String, rquired: true, minlength: 5},
    jobBoards: [{type: mongoose.Schema.Types.ObjectId, ref: "JobBoard"}]
});

userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});



userSchema.statics.comparePassword = function(password, callback){
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if(err){
            return callback(err);
        } else {
            if(!isMatch){
                return callback(null, isMatch)
            } else {
                return callback (null, this); //this being the user
            }
        }
    })
}


module.exports = mongoose.model('User', userSchema);