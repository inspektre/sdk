const { client, handleErrors } = require('../util');
const { SET_ATTACK_GRAPH } = require('../constants');

const callSetAttackGraph = async (currentProjectId, codeRepoId) => {
  const result = await client.mutate({
    mutation: SET_ATTACK_GRAPH,
    variables: { 
      projectId: currentProjectId,
      codeRepoId
    }
  })
  .catch(error => {
    console.log(error.networkError)
    // handleErrors(error);
  });

  if (result && result.data) {
      process.stdout.write('Created Graphs');
      return result.data.setGraphAttacks;
  }
}

module.exports = {
  callSetAttackGraph
}