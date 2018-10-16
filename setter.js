var express = require('express');
var graphqlHTTP = require('express-graphql');
var {
    buildSchema
} = require('graphql');

var message;

var schema = buildSchema(`
    type Query {
        getMessage: String
        setMessage(message: String): String
    }
`);

var root = {
    getMessage: () => {
        return message;
    },
    setMessage: (msg) => {
        message = msg.message;
        return "New message set."
    }
}

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');