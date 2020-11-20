const fs = require('fs');
const homedir = require('os').homedir();
const path = require('path');
// const figures = require('figures');
const { ApolloClient, InMemoryCache, HttpLink, ApolloLink } = require('apollo-boost');
const fetch = require('node-fetch');
const { handleErrors } = require('./errors');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(homedir, '/.config/inspektre/.env') });

const httpLink = new HttpLink({ uri: 'https://api.inspektre.io', fetch: fetch });

const initConfig = (verbose) => {
    // Get Home Dir for POSIX of Windows
    const dir = path.join(homedir, '/.config/inspektre')
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    if(verbose === true) {
        process.stdout.write(figures.main.pointer.concat(" Config location", dir, "\n"));
        process.stdout.write(figures.main.tick.concat(" Initialization is complete\n"));
    }
};

// Create authorization Link middleware
const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            authorization: `Bearer ${process.env.INSPEKTRE_ACCESS_TOKEN}`
        }
    });
    // Call the next link in the middleware chain.
    return forward(operation);
});

// Inspektre API Client
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

// File Exists
const fileExists = (file) => {
    try {
        if(fs.existsSync(file)) {
            return require(file);
        } 
        return false;
    } catch (err) {
        return false;
    }
};

// File Contents

module.exports = { client, initConfig, handleErrors, fileExists };