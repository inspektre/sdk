const { CREATE_SARIF } = require('../constants');
const { client, handleErrors } = require('../util');

const createSarif = async (meta) => {
    const { projectName, version, toolName, tags } = meta;
    const createdAt = { formatted: meta.createdAt };
    const result = await client.mutate({
        mutation: CREATE_SARIF,
        variables: { projectName, version, toolName, tags, createdAt}
    })
    .catch(err => {
        handleErrors(err);
    });

    if(result && result.data) {
        process.stdout.write(`SARIF Entry for ${result.data.CreateSarif.id} is now recorded\n`);
    }
};

module.exports = {
    createSarif
};