const gql = require('graphql-tag');

const DELETE_PROJECT = gql`
mutation($name: String!) {
  DeleteProject(name: $name) {
    name
    projectId
  }
}
`

const CREATE_PROJECT = gql`
  mutation(
    $name: String!
    $type: String!
    $requirements: [String!]!
    $lane: String!
    $likelihood: Float!
    $severity: Float!
    $skill: Float!
    $maturityModel: String!
    $createdAt: _Neo4jDateTimeInput!
  ) {
    CreateProject(
      name: $name
      type: $type
      requirements: $requirements
      lane: $lane
      likelihood: $likelihood
      severity: $severity
      skill: $skill
      maturityModel: $maturityModel
      createdAt: $createdAt
    ) {
      projectId
    }
  }
`

const ALTER_PROECT_UPDATED = gql`
mutation($name: String!, $projectId: ID!, $updatedAt: _Neo4jDateTimeInput!) {
  MergeProject(name: $name, projectId: $projectId, updatedAt: $updatedAt) {
    name
    projectId
  }
}
`

const ALTER_PROJECT_TAGS = gql`
mutation($name: String!, $tags: [String]) {
  MergeProject(name: $name, tags: $tags) {
    name
    tags
    projectId
  }
}
`

const QUERY_PROJECTS = gql`
query {
  Project {
    projectId
    name
  }
}
`
const QUERY_PROJECT_EXISTS = gql`
query($name: String!) {
  Project(filter: {name: $name}) {
    name
    projectId
  }
}
`

const QUERY_PROJECT = gql`
query($project: String!) {
  Project(filter: {name: $project}) {
    projectId
    name
  }
}
`


module.exports = { 
  DELETE_PROJECT,
  CREATE_PROJECT,
  ALTER_PROECT_UPDATED,
  ALTER_PROJECT_TAGS,
  QUERY_PROJECTS,
  QUERY_PROJECT,
  QUERY_PROJECT_EXISTS
};