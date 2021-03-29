const { client, handleErrors } = require('../util');
const { SET_ATTACK_GRAPH } = require('../constants');

const callSetAttackGraph = async (currentProjectId, codeRepoId) => {
  const projectId = currentProjectId;
  const result = await client.mutate({
    mutation: SET_ATTACK_GRAPH,
    variables: { 
      codeRepoId,
      projectId,
    }
  })
  .catch(error => {
    handleErrors(error);
  });

  if (result && result.data) {
      process.stdout.write('Created Graphs');
      console.dir(result);
      return result.data.setGraphAttacks;
  }
}

module.exports = {
  callSetAttackGraph
}