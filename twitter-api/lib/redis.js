const { createClient } = require('redis')
const { promisify } = require("util");


const REDIS_URI = 'redis://redis_twitter'



class RedisLib {
    constructor(){
        this.client = createClient(REDIS_URI)
        this.client.on("error", function(error) {
            console.error(error);
        });

        
    }

    getAsync(){
        // Transform into Promises
        return promisify(this.client.get).bind(this.client);
    }


    getAll(){

        this.getAsync('tweets').then(tweets => {
            
            return tweets
            
        }).catch(console.error);

    }

}

module.exports = RedisLib