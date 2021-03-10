const searchRouter = require('express').Router();
const passport = require('passport');
const passportConfig = require('../passport');
const axios = require('axios');

require('dotenv').config(); 

const appId = process.env.ADZUNA_ID
const appKey = process.env.API_KEY;
let baseUrl = `http://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=30&content-type=application/json`;

module.exports = searchRouter;

searchRouter.post("/", passport.authenticate('jwt',{session : false}), async (req, res) => {
    try {
        const {keywords, location} = req.body;
        const request = await axios.get(`${baseUrl}&what=${keywords}&where=${location}`)
        res.send(request.data);
    } catch (err) {
        res.status(500).json({message: {
            msgBody: err.message, 
            msgError: true
        }})
    }   
});