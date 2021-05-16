const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

// Configuration
require("dotenv").config();

// Define TypeDeps
const typeDefs = gql`
    type Query {
        sayHi: String!
    }
`;

// Define resolvers
const resolvers = {
    Query: {
        sayHi: () => "Hello world",
    },
};

// Define Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
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
