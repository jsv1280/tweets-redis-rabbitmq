'use strict';

const express = require('express');

// const httpsCall = require('./lib/https');

const redis = require('redis')

const clientRedis  = redis.createClient('redis://redis_twitter');

clientRedis.on('connect', function() {
    console.log('Conectado a Redis Server');
});

// Express App
const app = express();


// ENDPOINT TO REQUEST TWEETS FROM OFFICIAL API TWIITTER 
app.get('/redis_search', (req, res) => {

    clientRedis.get("tweets",function(err,reply){
        if(err) {
            console.log(err)
            res.status(500).send(err);
        }
        res.json(JSON.parse(reply));
        //console.log(reply)
    })
})
    
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(process.env.PORT, process.env.HOST);
console.log(`Running on http://${process.env.HOST}:${process.env.PORT}`);