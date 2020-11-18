const mongoose = require("mongoose");


const jobBoardSchema = new mongoose.Schema({
    title: {type: String, required: true},
    jobs: [{type: mongoose.Schema.Types.ObjectId, ref: "Job"}]
})




module.exports = mongoose.model('JobBoard', jobBoardSchema);