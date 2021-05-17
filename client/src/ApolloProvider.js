import React from "react";
import App from "./App";
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_SERVER_URL,
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
