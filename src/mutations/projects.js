const {
    DELETE_PROJECT,
    CREATE_PROJECT,
    ALTER_PROJECT_THREAT_LEVEL,
    ALTER_PROJECT_TAGS,
    ALTER_PROECT_UPDATED
} = require('../constants');
const { client, handleErrors } = require('../util');

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

const createProject = async (name, level, createdAt) => {
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
        mutation: CREATE_PROJECT,
        variables: { name, threatLevel, L1, L2, L3, createdAt }
    })
    .catch(error => {
        handleErrors(error);
    });
    
    if (result && result.data) {
        process.stdout.write(`Created project: ${name}\n`);
        return result.data.CreateProject.projectId;
    }
}

const alterProjectThreatLevel = async (name, projectId, level) => {
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
        variables: { name, projectId, threatLevel, L1, L2, L3 }
    });
    if(result && result.data) {
        process.stdout.write(`Project threat level altered: ${threatLevel}\n`);
    }
};

const alterProjectUpdated = async (name, projectId, updatedAt) => {
    const result = await client.mutate({
        mutation: ALTER_PROECT_UPDATED,
        variables: { name, projectId, updatedAt }
    })
    .catch(error => {
        console.log(error);
        handleErrors(error);
    });

    if(result && result.data) {
        process.stdout.write('Recording time\n')
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
    createProject,
    alterProjectThreatLevel,
    alterProjectUpdated,
    alterProjectTags
};