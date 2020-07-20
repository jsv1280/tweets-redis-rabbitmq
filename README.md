# Tweets-Redis-Rabbitmq
Microservices Architecture to track tweets that contain node,platzi,open source words based on Official Twitter-API, sending this tweets to RabbitMQ queue and persist this data in Redis in-memory database

## :loudspeaker: Requirements
- Docker version 19.03.8

## :wrench: Built with
- Docker
- Express
- GraphQL
- RabbitMQ
- Redis

## :post_office: Structure

Every service created have their own `Dockerfile` in the root folder to build the container

- `twitter-api/` Service that handles API REST to expose tweets save in redis
- `twitter-client/` Service that subscribe to RabbitMQ twitter-rabbitmq queue and save or updated tweets in redis
- `twitter-graphql/` Service that handles GraphQL specification to expose tweets save in redis
- `twitter-stream/` Service in charge of make OAuth authentication in Twitter and connect to Twitter Real Time Stream of Tweets and publish them in RabbitMQ twitter-rabbitmq queue
- `rabbitmq_twitter` RabbitMQ Image 
- `redis_twitter` Redis Image 


## :alarm_clock: Testing
 - `twitter-api/` Run in the root folder service `npm t` to run test cases of this service built with **Mocha,testserver,proxyquire**

## :airplane: Deploy

- Run `docker-compose up` to build and start containers

> If you want to run a specific container do `docker-compose up SERVICE_NAME`

## :black_nib: Author
-  [Jairo Salazar][github_url] Backend Developer (Platzi Master Student)

## :bookmark_tabs: License
This project is under license MIT

## :heart: Acknowledgment
- Cesar Joshua Pedraza Cruz _(Coach Platzi Master)_

## :telescope: References
- [RabbitMQ Documentation][rabbit_mq_url]
- [GraphQL Documentation][graphql_url]
- [Redis Node JS Driver][redis_node_js_driver]	
- [Docker Documentation][docker_url]
- [Redis Documentation][redis_url]
- [Filter real time tweets Twitter][filter_tweets_url]

[rabbit_mq_url]: https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
[graphql_url]: https://graphql.org/learn/
[redis_node_js_driver]: https://github.com/NodeRedis/node-redis
[docker_url]: https://docs.docker.com/
[redis_url]: https://redis.io/documentation
[github_url]: https://github.com/jsv1280
[filter_tweets_url]: https://developer.twitter.com/en/docs/labs-v1/filtered-stream/overview
