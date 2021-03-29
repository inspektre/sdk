const { CREATE_TOOL_RESULTS } = require('../constants');
const { client, handleErrors } = require('../util');
const chalk = require('chalk');
const figures = require('figures');

const CreateToolResults = async (meta) => {
    const { projectId, codeRepoId, toolName, tags } = meta;
    const createdAt = { formatted: meta.createdAt };
    const result = await client.mutate({
        mutation: CREATE_TOOL_RESULTS,
        variables: { projectId, codeRepoId, toolName, tags, createdAt }
    })
    .catch(err => {
        handleErrors(err);
    });

    if(result && result.data) {
        process.stdout.write(chalk.green(figures.main.tick).concat('Tool Entry for is now recorded\n'));
        return result.data.CreateToolResults.toolResultsId;
    }
};

module.exports = {
    CreateToolResults
};