const gql = require('graphql-tag');

const SET_ATTACK_GRAPH = gql`
mutation($projectId: ID!, $codeRepoId: ID! ) {
  setGraphAttacks(projectId: $projectId, codeRepoId: $codeRepoId)
}
`;


module.exports = {
  SET_ATTACK_GRAPH
};