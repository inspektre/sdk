const gql = require('graphql-tag');

const PROJECT_VERIFICATIONS_META = gql`
mutation($projectName: String!) {
  VerificationsMeta(projectName: $projectName)
}
`
const PROJECT_ATTACKS_META = gql`
mutation($projectName: String!) {
  AttacksMeta(projectName: $projectName)
}
`
const PROJECT_WEAKNESS_META = gql`
mutation($projectName: String!) {
  WeaknessProjectMeta(projectName: $projectName)
}
`
// ScansProjectMeta
const PROJECT_SCANS_META = gql`
mutation($projectName: String!, $version: String!, $scanId: ID!) {
    ScansProjectMeta(projectName: $projectName, version: $version, scanId: $scanId)
}
`

const PROJECT_CODEINTEL_META = gql`
mutation($projectName: String!, $version: String!, $codeIntelId: ID!) {
  CodeIntelProjectMeta(projectName: $projectName, version: $version, codeIntelId: $codeIntelId)
}
`

const CODE_INTEL_SCANS_META = gql`
mutation($codeIntelId: ID!, $projectName: String!, $version: String!, $scanId: ID!) {
    CodeIntelScansMeta(codeIntelId: $codeIntelId, projectName: $projectName, version: $version, scanId: $scanId)
}
`
const CODE_INTEL_ATTACKS_META = gql`
mutation($projectName: String!, $codeIntelId: ID!) {
  CodeIntelAttacksMeta(projectName: $projectName, codeIntelId: $codeIntelId)
}
`

const SARIF_PROJECTS_META = gql`
mutation($sarifId: ID!, $projectName: String!, $version: String!) {
    SarifProjectMeta(sarifId: $sarifId, projectName: $projectName, version: $version)
}
`
const SARIF_ATTACKS_META = gql`
mutation($projectName: String!, $sarifId: ID!) {
  SarifAttacksMeta(projectName: $projectName, sarifId: $sarifId)
}
`

module.exports = {
    PROJECT_VERIFICATIONS_META,
    PROJECT_ATTACKS_META,
    PROJECT_WEAKNESS_META,
    PROJECT_SCANS_META,
    PROJECT_CODEINTEL_META,
    CODE_INTEL_SCANS_META,
    CODE_INTEL_ATTACKS_META,
    SARIF_PROJECTS_META,
    SARIF_ATTACKS_META
};