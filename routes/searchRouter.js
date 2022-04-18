const searchRouter = require('express').Router();
const passport = require('passport');
const axios = require('axios');
const response = require('./utils/response');

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
        response(res, 500, true, err.message);
    }   
});