const { CREATE_CODE_REPO, ASSIGN_REPO_TO_PROJECT } = require('../constants');
const { client, handleErrors  } = require('../util');

const setProjectCodeRepo = async (meta, currentProjectId) => {
    const scanTags = meta.scanTagsRaw;
    const projectId = currentProjectId;
    const { dateScanned, repoName, repoVersion  } = meta;
    const { logging, functions, exceptions, classes, urls } = meta.tagCounters;
    
    const result = await client.mutate({
        mutation: CREATE_CODE_REPO,
        variables: { projectId, dateScanned, repoName, repoVersion, logging, functions, exceptions, classes, urls, scanTags }
    })
    .catch(error => {
        handleErrors(error);
    });

    if(result && result.data) {
        console.log("code Repo is set");
        return result.data.CreateCodeRepo.codeRepoId;
    }
};

const setProjectRepoRelationShip = async (currentProjectId, codeRepoId) => {
    const projectId = currentProjectId;
    const result = await client.mutate({
        mutation: ASSIGN_REPO_TO_PROJECT,
        variables: { projectId, codeRepoId}
    })
    .catch(err => {
        handleErrors(err);
    })
    if(result && result.data) {
        console.log("Repo has been assigned to a project");
        return result.data.MergeProjectCoderepo;
    }
}

module.exports = {
    setProjectCodeRepo,
    setProjectRepoRelationShip
}