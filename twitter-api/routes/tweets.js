const express = require('express');

const TweetsService = require('../services/tweets')


function redisSearchAPI(app){
    
    const router = express.Router()
    app.use("/tweets",router)

    const tweetService = new TweetsService()

    router.get('/', async (req, res,next) => {

        try {
            const tweets = await tweetService.getTweets()
           
            res.json({
                tweets
            });
            

        } catch (error) {
            next(error)
        }

    })
}

module.exports = redisSearchAPI