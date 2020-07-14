'use strict';

const redis = require('redis')

const clientRedis  = redis.createClient('redis://redis_twitter');

clientRedis.on('connect', function() {
    console.log('Conectado a Redis Server');
    clientRedis.del('tweets')
});

clientRedis.on('error', function(err) {
    console.log('Redis error: ' + err);
});


const amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmq_twitter:5672', function(error0, connection) {
        let datosEnArray = []
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'twitter-rabbitmq';

            channel.assertQueue(queue, {
                durable: false
            });

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

            channel.consume(queue, function(msg) {
                console.log(" [x] Received %s", msg.content.toString());

                clientRedis.get("tweets",function(err,reply){
                    if(err) {
                        console.log(err)
                        clientRedis.set("tweets",JSON.stringify(datosEnArray));
                    }
                    else {
                        let actualTweets = JSON.parse(reply) || [];
                        let guardarRedis = '';
                        let datosCrudos = JSON.parse(msg.content.toString());
    
                        if(actualTweets.length == 0){
                           
                            datosEnArray.push(datosCrudos)
                            guardarRedis = JSON.stringify(datosEnArray)
                        }
                        else {

                            let datosCrudos = JSON.parse(msg.content.toString())
                            actualTweets.push(datosCrudos)
                            guardarRedis = JSON.stringify(actualTweets)
                        }
                       
                        clientRedis.set("tweets",guardarRedis);
                    }
                    
                })

            }, {
                noAck: true
            });
        });
});