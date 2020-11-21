const figures = require('figures');
const chalk = require('chalk');

const handleErrors = (error) => {
    if(error.ApolloError) {
        process.stderr.write(chalk.red(figures.main.cross).concat(" Configuration error occured.\n"));
    }
    else if (error.networkError) {
        process.stderr.write(chalk.red(figures.main.cross).concat(" Network error occured.\n"));
        console.dir(error.networkError.response);
    }
    else if(error.graphQLErrors) {
        process.stderr.write(chalk.red(figures.main.cross).concat(" ", error.graphQLErrors[0].message, "\n"));
        console.dir(error.graphQLErrors.locations);
    }
    
};


module.exports = { handleErrors };