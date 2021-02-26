const {
    DELETE_PROJECT,
    CREATE_PROJECT,
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

const createProject = async (
    name,
    type,
    requirements,
    lane,
    likelihood,
    severity,
    skill,
    maturityModel,
    createdAt
    ) => {
    const result = await client.mutate({
        mutation: CREATE_PROJECT,
        variables: { 
            name,
            type,
            requirements,
            lane,
            likelihood,
            severity,
            skill,
            maturityModel,
            createdAt
        }
    })
    .catch(error => {
        handleErrors(error);
    });
    
    if (result && result.data) {
        process.stdout.write(`Created project: ${name}\n`);
        return result.data.CreateProject.projectId;
    }
}


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
    alterProjectUpdated,
    alterProjectTags
};