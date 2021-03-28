const gql = require('graphql-tag');

const QUERY_CHAPTER_IDS=gql`
query($chapterNames: [String!]!) {
  Asvs(filter: { chapterName_in: $chapterNames }) {
    AsvsId
  }
}
`
const MUTATE_ORG_PROJECT_CODE_REPO_VERIFICATIONS = gql`
mutation($orgId: ID!, $AsvsId: ID!, $codeRepoId: ID!, $projectId: ID! $createdAt: _Neo4jDateTimeInput!) {
  MergeOrgVerifications(
    from:
    {
      id: $orgId
    }
    to: {
     AsvsId: $AsvsId
    }
    data: {
      status: false
      createdAt: $createdAt
      updatedAt: $createdAt
    }
  ) {
    from {
      id
    }
  }
  MergeProjectVerifications(
    from:
    {
      projectId: $projectId
    }
    to: {
     AsvsId: $AsvsId
    }
    data: {
      status: false
      createdAt: $createdAt
      updatedAt: $createdAt
    }
  ) {
    from {
      projectId
    }
  }
  MergeCodeRepoVerifications(
    from:
    {
      codeRepoId: $codeRepoId
    }
    to: {
     AsvsId: $AsvsId
    }
    data: {
      status: false
      createdAt: $createdAt
      updatedAt: $createdAt
    }
  ) {
    from {
      codeRepoId
    }
  }
}
`

module.exports = {
  QUERY_CHAPTER_IDS,
  MUTATE_ORG_PROJECT_CODE_REPO_VERIFICATIONS
}