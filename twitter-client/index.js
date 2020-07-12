'use strict';

const redis = require('redis')

const clientRedis  = redis.createClient('redis://redis_twitter');

clientRedis.on('connect', function() {
    console.log('Conectado a Redis Server');
});



const amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmq_twitter:5672', function(error0, connection) {

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

                clientRedis.set("tweets",msg.content.toString());
            }, {
                noAck: true
            });
        });
});