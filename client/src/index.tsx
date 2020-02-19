/* Core */
import React from 'react';
import ReactDOM from 'react-dom';
import * as Apollo from '@apollo/client';

/* Instruments */
import Pages from './pages';
import Login from './pages/login';
import injectStyles from './styles';
import { resolvers, typeDefs } from './resolvers';

const cache = new Apollo.InMemoryCache();
const link = new Apollo.HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
        authorization: localStorage.getItem('token'),
    },
});

const client: Apollo.ApolloClient<Apollo.NormalizedCacheObject> = new Apollo.ApolloClient(
    {
        cache,
        link,
        typeDefs,
        resolvers,
    },
);

cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem('token'),
        cartItems: [],
    },
});

const IS_LOGGED_IN = Apollo.gql`
    query IsUserLoggedIn {
        isLoggedIn @client
    }
`;

const App = () => {
    const { data } = Apollo.useQuery(IS_LOGGED_IN);

    return data.isLoggedIn ? <Pages /> : <Login />;
};

injectStyles();
ReactDOM.render(
    <Apollo.ApolloProvider client={client}>
        <h1>hello</h1>
        {/* <App /> */}
    </Apollo.ApolloProvider>,
    document.getElementById('root'),
);
