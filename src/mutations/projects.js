const { DELETE_PROJECT, ALTER_PROJECT_THREAT_LEVEL, ALTER_PROJECT_TAGS, ALTER_PROECT_UPDATED } = require('../constants');
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
    // Defaulting to L1 by default.
    let threatLevel = 'L1';
    let L1 = true;
    let L2 = false;
    let L3 = false;
    if (level === 'L3') {
        threatLevel = 'L3';
        L3 = true;
        L1 = false;
    }
    else if (level === 'L2') {
        threatLevel = 'L2';
        L1 = false;
        L2 = true;
    }
    
    const result = await client.mutate({
        mutation: ALTER_PROJECT_THREAT_LEVEL,
        variables: { name, threatLevel, L1, L2, L3 }
    });
    if(result && result.data) {
        console.log(result.data.MergeProject);
    }
};

const alterProjectUpdated = async (name, updated) => {
    const result = await client.mutate({
        mutation: ALTER_PROECT_UPDATED,
        variables: { name, updated }
    });
    if(result && result.data) {
        console.log(result.data);
    }
}

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
    alterProjectUpdated,
    alterProjectTags
};