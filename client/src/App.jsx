import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
// components
import BookList from "./components/BookList";

const client = new ApolloClient({
    uri: "http://localhost:8080/graphql",
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div id="app">
                <h1>My book list</h1>
                <BookList />
            </div>
        </ApolloProvider>
    );
}

export default App;
