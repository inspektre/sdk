const figures = require('figures');
const chalk = require('chalk');

const handleErrors = (error) => {
    if(error.ApolloError) {
        process.stderr.write(chalk.red(figures.main.cross).concat("Configuration error occured.\n"));
        process.exit(-1)
    }
    else if(error.graphQLErrors) {
        process.stderr.write(chalk.red(figures.main.cross).concat("Data Formattting errors\n"));
        process.exit(-1);
    }
    else if (error.networkError) {
        process.stderr.write(chalk.red(figures.main.cross).concat(" Network error occured.\n"));
        process.exit(-1);
    }
    else {
        process.stderr.write(chalk.red(figures.main.cross).concat("Unknown error\n"));
        process.exit(-1);
    }
};

const handleRequiredInputs = (details) => {
    process.stderr.write(chalk.red(figures.main.cross).concat("Missing inputs: ", details))
    setTimeout(() => {
        process.exit(0);
    }, 100);
}


module.exports = { handleErrors, handleRequiredInputs };