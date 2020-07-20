const tweetMocks = require('../utils/mocks/tweets')
const RedisLib = require('../lib/redis')

class TweetsService {
    constructor(){
        this.redis = new RedisLib()

    }

    async getTweets(){
        const tweets = await this.redis.getAll()
        return tweets
    }
}

module.exports = TweetsService