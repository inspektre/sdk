const gql = require('graphql-tag');

const CREATE_SCANS = gql`
mutation(
    $projectName: String!,
    $version: String!,
    $dateScanned: _Neo4jDateTimeInput!,
    $ruleId: String!,
    $ruleName: String!,
    $fileName: String!,
    $startLocationLine: Int!,
    $startLocationColumn: Int!,
    $endLocationLine: Int!,
    $endLocationColumn: Int!
) {
    CreateScans(
        projectName: $projectName
        version: $version
        dateScanned: $dateScanned
        ruleId: $ruleId
        ruleName: $ruleName
        fileName: $fileName
        startLocationLine: $startLocationLine
        startLocationColumn: $startLocationColumn
        endLocationLine: $endLocationLine
        endLocationColumn: $endLocationColumn
    ) {
        scansId
    }
}
`

module.exports = { CREATE_SCANS };