import React from 'react';
import {createRoot} from 'react-dom/client';
import Admin from './Admin';
import './index.css';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const container = document.getElementById('root');
const root = createRoot(container!);

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql/', // backend
    cache: new InMemoryCache()
});

root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            {/*<ThemeProvider theme={theme}>*/}
            <Admin/>
            {/*</ThemeProvider>*/}
        </ApolloProvider>
    </React.StrictMode>
);