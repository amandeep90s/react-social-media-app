const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

// Configuration
require("dotenv").config();

// Define TypeDeps
const typeDefs = require("./graphql/typeDefs");

// Define resolvers
const resolvers = require("./graphql/resolvers");

const pubsub = new PubSub();

// Define Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub }),
});

// Database Connection
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("DB Connected"))
    .catch((error) => console.log("DB Connection error", error));

// Server Port
const port = process.env.PORT || 5000;
server.listen({ port }).then((result) => {
    console.log(`server running at ${result.url}`);
});
