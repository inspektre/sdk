const gql = require('graphql-tag');

const QUERY_CODE_REPO_BY_PROJECT = gql`
query($projectId: String!) {
    CodeRepo(projectId: $projectId) {
        codeRepolId
        projectId
        repoName
        repoVersion
        dateScanned
        logging
        functions
        exceptions
        classes
        urls
        scanTags
    }
}
`


const CREATE_CODE_REPO = gql`
mutation(
    $projectId: String!,
    $dateScanned: _Neo4jDateTimeInput!,
    $repoName: String!,
    $repoVersion: String!,
    $logging: Int!,
    $functions: Int!,
    $exceptions: Int!,
    $classes: Int!,
    $urls: Int!,
    $scanTags: [String]!
) {
    CreateCodeRepo(
        projectId: $projectId,
        dateScanned: $dateScanned, 
        repoName: $repoName,
        repoVersion: $repoVersion,
        logging: $logging, 
        functions: $functions, 
        exceptions: $exceptions, 
        classes: $classes,
        urls: $urls,
        scanTags: $scanTags
    ) {
        codeRepoId
    }
}
`

module.exports = {
    QUERY_CODE_REPO_BY_PROJECT,
    CREATE_CODE_REPO
}