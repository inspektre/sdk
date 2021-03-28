const gql = require('graphql-tag');

const CREATE_TOOL_RESULTS = gql`
mutation($projectId: String!, $codeRepoId: String!,  $toolName: String!, $tags: [String], $createdAt: _Neo4jDateTimeInput!) {
    CreateToolResults(
        projectId: $projectId,
        codeRepoId: $codeRepoId,
        toolName: $toolName,
        tags: $tags,
        createdAt: $createdAt
    ) {
        toolResultsId
    }
}
`

module.exports = {
    CREATE_TOOL_RESULTS
};