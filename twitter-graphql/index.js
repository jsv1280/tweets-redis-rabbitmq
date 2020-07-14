

const express = require('express');

//GRAPHQL
const {graphqlHTTP} = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./lib/resolvers')

//UTILS
const { join } = require('path')
const { readFileSync } = require('fs')


// INITALIZE EXPRESS APP
const app = express();
const redis = require('redis')


// LOAD SCHEMA
const typeDefs = readFileSync(
    join(__dirname,'lib','schema.graphql'),
    'utf-8'
)

const schema = makeExecutableSchema({
    typeDefs, resolvers
})

// ADD MIDDLEWARE TO EXPRESS
app.use('/api/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}))

app.get('/', (req, res) => {
    res.send('Hello World GraphQL');
});


// START SERVER
app.listen(process.env.PORT, process.env.HOST);
console.log(`Running on http://${process.env.HOST}:${process.env.PORT}`);