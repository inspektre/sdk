const { CREATE_SCANS, ASSIGN_SCANS_TO_REPO_AND_PROJECT } = require('../constants');
const { client, handleErrors } = require('../util');
const chalk = require('chalk');
const figures = require('figures');

const createScans = async (scanEntry, currentProjectId, codeRepoId) => {
    const projectId = currentProjectId;
    const {
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
            projectId,
            codeRepoId,
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
        process.stdout.write(chalk.green(figures.main.tick).concat(" Scan result captured\n"));
        return result.data.CreateScans.scansId;
    }
};

const setScansRelationShip = async (scanId, currentProjectId, codeRepoId) => {
    const scansId = scanId;
    const projectId = currentProjectId;
    const result = await client.mutate({
        mutation: ASSIGN_SCANS_TO_REPO_AND_PROJECT,
        variables: { scansId, projectId, codeRepoId }
    })
    .catch(err => {
        handleErrors(err);
    })
    if(result && result.data) {
        process.stdout.write(chalk.green(figures.main.tick).concat(" Scans has been assigned to a project & Code Repository\n"));
        return result.data;
    }
}


module.exports = { createScans, setScansRelationShip };