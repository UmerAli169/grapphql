import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
    uri: 'http://localhost:5000/graphql', // Replace with your actual endpoint
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    credentials: "include", // very important for cookies!

});

export default client;