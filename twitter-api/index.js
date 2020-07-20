'use strict';

const express = require('express');
const redisSearchAPI = require('./routes/tweets');
// const httpsCall = require('./lib/https');


// Express App
const app = express();


// ENDPOINT TO REQUEST TWEETS FROM OFFICIAL API TWIITTER 
redisSearchAPI(app)
    
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(process.env.PORT, process.env.HOST);
console.log(`Running on http://${process.env.HOST}:${process.env.PORT}`);