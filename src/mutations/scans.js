const { CREATE_SCANS } = require('../constants');
const { client, handleErrors } = require('../util');

const createScans = async (scanEntry) => {
    const {
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
    } = scanEntry;
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
        return result.data.CreateScans.scansId;
    }
};


module.exports = { createScans };