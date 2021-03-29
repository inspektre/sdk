const gql = require('graphql-tag');

const SET_ATTACK_GRAPH = gql`
mutation($codeRepoId: String!, $projectId: String!) {
  setGraphAttacks(codeRepoId: $codeRepoId, projectId: $projectId)
}
`;


module.exports = {
  SET_ATTACK_GRAPH
};