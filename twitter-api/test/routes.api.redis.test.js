const assert = require('assert')
const proxyquire = require('proxyquire')

const {
    tweetMocks,
    TweetServiceMock
} = require('../utils/mocks/tweets')


const testServer = require('../utils/testServer')

describe("routes - REST API - tweets", function(){
    const route = proxyquire('../routes/tweets',{
        "../services/tweets" : TweetServiceMock
    })

    const request = testServer(route)

    describe("GET /tweets", function(){
        it("should respond with status 200", function(done){
            request.get('/tweets').expect(200,done)
        })

        it("should respond with content type json", function(done){
            request.get('/tweets').expect("Content-Type",/json/,done)
        })

        it("should respond with not error", function(done){
            request.get('/tweets').end((err,res)=>{
                assert.strictEqual(err,null)
                done()
            })
        })

        it("should respond with the list of tweets", function(done){
            request.get('/tweets').end((err,res)=>{
                assert.deepEqual(res.body,{
                    tweets: tweetMocks
                })
                done()
            })
        })
    })
})