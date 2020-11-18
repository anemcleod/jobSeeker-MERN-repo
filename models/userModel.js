const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {type: String, rquired: true, unique: true},
    displayName: {type: String, default: "there"},
    password:  {type: String, rquired: true, minlength: 5},
    jobBoards: [{type: mongoose.Schema.Types.ObjectId, ref: "JobBoard"}]
});

module.exports = mongoose.model('User', userSchema);