const { CREATE_SCANS } = require('../constants');
const { client, handleErrors } = require('../util');

const createScans = async (meta) => {
    const result = await client.mutate({
        mutation: CREATE_SCANS,
        variables: { 
            projectName,
            version,
            dateScanned,
            ruleId,
            ruleName,
            fileName,
            startLocationLine,
            startLocationColumn,
            endLocationLine,
            endLocationColumn
        }
    })
    .catch(error => {
        handleErrors(error);
    });

    if(result && result.data && result.data.CreateScans) {
        process.stdout.write(`Recorded result: ${result.data.CreateScans}`)
    }
};


module.exports = { createScans };