import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://127.0.0.1:5000/graphql",
    credentials: "include", // This is correct for sending cookies
  }),
  cache: new InMemoryCache(),
});

export default client;  