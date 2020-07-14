'use strict';

const https = require('https');


function makeHttpsRequest(wordSearch, callback){

    let tweets = '';
    let data = '';

    // + '&count=1'

    const options = {
        hostname: 'api.twitter.com',
        port: 443,
        path: '/1.1/search/tweets.json?q='+ encodeURIComponent(wordSearch) + '&lang=en',
        method: 'GET',
        headers : {
            'Authorization' : ''
        }
    };
    
    const requestTwitter = https.request(options, (res) => {
      
        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            
            tweets = JSON.parse(data);

            callback({
                tweets,
                statusCode : res.statusCode
            });
        });
    });
      
    requestTwitter.on('error', (e) => {
        console.error(e);
    });
    
    requestTwitter.end();

}

module.exports = makeHttpsRequest