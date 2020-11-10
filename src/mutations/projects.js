const { DELETE_PROJECT, ALTER_PROJECT_THREAT_LEVEL, ALTER_PROJECT_TAGS } = require('../constants');
const { client, handleErrors  } = require('../util');

const deleteProject = async (name) => {
    const result = await client.mutate({
        mutation: DELETE_PROJECT,
        variables: { name }
    })
    .catch(error => {
    handleErrors(error);
    });

    if(result && result.data) {
        console.log("Project has been deleted or does not exist.");
    }
};

const alterProjectThreatLevel = async (name, level) => {
    // Defaulting to L2 as a fail-safe.
    const updated = new Date()
    let threatLevel = 'L2';
    let L1 = false;
    let L2 = true;
    let L3 = true;
    if (level === 'L3') {
        threatLevel = 'L3';
        L3 = true;
        L2 = false;
    }
    else if (level === 'L1') {
        threatLevel = 'L1';
        L1 = true;
        L2 = false;
    }
    const result = await client.mutate({
        mutation: ALTER_PROJECT_THREAT_LEVEL,
        variables: { name, threatLevel, L1, L2, L3, updated}
    });
    
    if(result && result.data) {
        console.log(result.data.MergeProject);
    }
};

const alterProjectTags = async (name, tags) => {
    const result = await client.mutate({
        mutation: ALTER_PROJECT_TAGS,
        variables: { name, tags }
    });
    
    if(result && result.data) {
        console.log(result.data.MergeProject);
    }
};

module.exports = {
    deleteProject,
    alterProjectThreatLevel,
    alterProjectTags
};