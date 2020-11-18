const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    jobBoardId: String,
    title: String,
    company: String,
    location: String,
    description: String,
    link: String,
    date: String,
    contract: String
})

module.exports = mongoose.model('Job', jobSchema);