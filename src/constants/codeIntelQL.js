const gql = require('graphql-tag');

const QUERY_CODE_INTEL_BY_PROJECT = gql`
query($projectName: String!) {
    CodeIntel(projectName: $projectName) {
        projectName
        version
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

const QUERY_CODE_INTEL_BY_PROJECT_VERSION = gql`
query($projectName: String!, $version: String!) {
    CodeIntel(projectName: $projectName, version: $version) {
        projectName
        version
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

const CREATE_CODE_INTEL = gql`
mutation(
    $projectName: String!,
    $version: String!,
    $dateScanned: _Neo4jDateTimeInput!,
    $logging: Int!,
    $functions: Int!,
    $exceptions: Int!,
    $classes: Int!,
    $urls: Int!,
    $scanTags: [String]!
) {
    CreateCodeIntel(
        projectName: $projectName, 
        version: $version, 
        dateScanned: $dateScanned, 
        logging: $logging, 
        functions: $functions, 
        exceptions: $exceptions, 
        classes: $classes,
        urls: $urls,
        scanTags: $scanTags
    ) {
        id
    }
}
`

module.exports = {
    QUERY_CODE_INTEL_BY_PROJECT,
    QUERY_CODE_INTEL_BY_PROJECT_VERSION,
    CREATE_CODE_INTEL
}