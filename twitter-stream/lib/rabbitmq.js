

function sendTweetQueue(tweet){
   
    var amqp = require('amqplib/callback_api');

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

            
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(tweet)))
  

        });
        
    });
}


module.exports = sendTweetQueue