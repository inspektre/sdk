const gql = require('graphql-tag');

// Add Project Code Repo Relationship
const ASSIGN_REPO_TO_PROJECT = gql`
mutation($projectId: ID!, $codeRepoId: ID!) {
  MergeProjectCoderepo(
    from: { projectId: $projectId }
    to: { codeRepoId: $codeRepoId}
  ) {
    from {
      projectId
    }
    to {
      codeRepoId
    }
  }
}
`

const ASSIGN_SCANS_TO_REPO_AND_PROJECT = gql`
mutation($scansId: ID!, $projectId: ID!, $codeRepoId: ID!) {
  AddProjectScans(
    from: { projectId: $projectId}
    to: { scansId: $scansId}
  ) {
    from {
      projectId
    }
    to {
      scansId
    }
  }
  AddCodeRepoScans(
    from: { codeRepoId: $codeRepoId }
    to: { scansId: $scansId }
  ) {
    from {
      codeRepoId
    }
    to {
      scansId
    }
  }
}
`


module.exports = {
  ASSIGN_REPO_TO_PROJECT,
  ASSIGN_SCANS_TO_REPO_AND_PROJECT
}