const { promisify } = require("util");
const redis = require('redis')
const redisClient = redis.createClient('redis://redis_twitter');

const getAsync = promisify(redisClient.get).bind(redisClient);

module.exports = {
    getTweets: async () => {

        try {
            let tweets = await getAsync('tweets');
            return  Array.from(JSON.parse(tweets));

        } catch (error) {
            console.error(error)
        }
        
    }
}