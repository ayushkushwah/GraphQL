var express = require('express');
var graphqlHTTP = require('express-graphql');
var {
  buildSchema
} = require('graphql');

var credentials = {
  userId: 10,
  firstName: "Ayush",
  lastName: "Kushwah",
  username: "ayushkushwah",
  password: "password",
  phone: "8982288090"
}

var schema = buildSchema(`
    type User {
        userId: Int,
        firstName: String,
        lastName: String,
        username: String,
        phone: String
    }
    type Auth {
        isLoggedIn: Boolean,
        getFullName: String,
        getUser: User
    }
    type Query {
        userLogin(username: String, password: String): Auth
    }
`);

class User {
  constructor() {
    this.userId = credentials.userId;
    this.firstName = credentials.firstName;
    this.lastName = credentials.lastName;
    this.username = credentials.username;
    this.phone = credentials.phone;
  }
}

class Auth {
  constructor(isLoggedIn) {
    this.isLoggedIn = isLoggedIn;
  }
  getFullName() {
    return (this.isLoggedIn) ? credentials.firstName + " " + credentials.lastName : null;
  }
  getUser() {
    return (this.isLoggedIn) ? new User() : null;
  }
}

var root = {
  userLogin: ({
    username,
    password
  }) => {
    var auth = new Auth();
    if (username == credentials.username && password == credentials.password) {
      auth.isLoggedIn = true;
    } else {
      auth.isLoggedIn = false;
    }
    return auth;
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