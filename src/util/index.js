const fs = require('fs');
const homedir = require('os').homedir();
const path = require('path');
const figures = require('figures');
const chalk = require('chalk');
const { ApolloClient, InMemoryCache, HttpLink, ApolloLink } = require('@apollo/client/core');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const { handleErrors, handleRequiredInputs } = require('./errors');
const packageJson = require('../../package.json');

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

const generateDate = (dateString) => {
    const date = new Date(dateString);
    return {
        year: date.getFullYear(),
        month: date.getMonth()+1,
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
    };
};

// Generate Auth Link
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
    cache: new InMemoryCache(),
    name: 'inspektre-sdk',
    headers: {
        authorization: `Bearer ${process.env.INSPEKTRE_ACCESS_TOKEN}`
    },
    version: packageJson.version,
    queryDeduplication: false,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
    },
});

// File Exists
const fileExists = (file) => {
    try {
        if(fs.existsSync(file)) {
            return true;
        } 
        return false;
    } catch (err) {
        return false;
    }
};

const requirementsAvailable = [
    {
        id: 1,
        chapter: "Architecture, Design and Threat Modeling Requirements"
    },
    {
        id: 2,
        chapter: "Authentication Verification Requirements"
    },
    {
        id: 3,
        chapter: "Session Management Verification Requirements"
    },
    {
        id: 4,
        chapter: "Access Control Verification Requirements"
    },
    {
        id: 5,
        chapter: "Validation, Sanitization and Encoding Verification Requirements"
    },
    {
        id: 6,
        chapter: "Stored Cryptography Verification Requirements"
    },
    {
        id: 7,
        chapter: "Error Handling and Logging Verification Requirements"
    },
    {
        id: 8,
        chapter: "Data Protection Verification Requirements"
    },
    {
        id: 9,
        chapter:"Communications Verification Requirements"
    },
    {
        id: 10,
        chapter: "Malicious Code Verification Requirements"
    },
    {
        id: 11,
        chapter: "Business Logic Verification Requirements"
    },
    {
        id: 12,
        chapter: "File and Resources Verification Requirements"
    },
    {
        id: 13,
        chapter: "API and Web Service Verification Requirements"
    },
    {
        id: 14,
        chapter: "Configuration Verification Requirements"
    },
];

const availableLanes = [
    'greenLane',
    'yellowLane',
    'redLane'
];

const commaSeparatedRequirementsList = (values) => {
    return [...new Set(values.split(',').map((val) => {
        const num = isNaN(parseInt(val))? 0: parseInt(val);
        return requirementsAvailable.find((req) => {
            if(req.id === num) {
                return req;
            }
        })
    }))].map((selection) => selection.chapter);
}


module.exports = { client, initConfig, handleErrors, handleRequiredInputs, fileExists, generateDate, commaSeparatedRequirementsList, requirementsAvailable, availableLanes };