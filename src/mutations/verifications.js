const chalk = require('chalk');
const figures = require('figures');
const { MUTATE_ORG_PROJECT_CODE_REPO_VERIFICATIONS } = require('../constants');
const { client, handleErrors  } = require('../util');

const setVerifications = async (orgId, AsvsId, codeRepoId, currentProjectId, createdAt) => {
  const projectId = currentProjectId
  const result = await client.mutate({
    mutation: MUTATE_ORG_PROJECT_CODE_REPO_VERIFICATIONS,
    variables: { orgId, AsvsId, codeRepoId, projectId, createdAt }
  })
  .catch(error => {

    handleErrors(error);
  });
  if(result && result.data) {
    process.stderr.write(chalk.green(figures.main.tick).concat(" Verifications set for new project.\n"));
  }
  return null;
}

module.exports = {
  setVerifications
}