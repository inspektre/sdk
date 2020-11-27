const gql = require('graphql-tag');

const CREATE_SARIF = gql`
mutation($projectName: String!, $version: String!, $toolName: String!, $tags: [String], $createdAt: _Neo4jDateTimeInput!) {
    CreateSarif(
        projectName: $projectName,
        version: $version,
        toolName: $toolName,
        tags: $tags,
        createdAt: $createdAt
    ) {
        id
    }
}
`

module.exports = {
    CREATE_SARIF
};