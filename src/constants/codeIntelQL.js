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
    $urls: Int!
) {
    CreateCodeIntel(
        projectName: $projectName, 
        version: $version, 
        dateScanned: $dateScanned, 
        logging: $logging, 
        functions: $functions, 
        exceptions: $exceptions, 
        classes: $classes,
        urls: $urls
    ) {
        projectName
    }
}
`

module.exports = {
    QUERY_CODE_INTEL_BY_PROJECT,
    QUERY_CODE_INTEL_BY_PROJECT_VERSION,
    CREATE_CODE_INTEL
}