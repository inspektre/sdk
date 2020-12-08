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
mutation($name: String!, $threatLevel: String!, $L1: Boolean!, $L2: Boolean!, $L3: Boolean!, $createdAt: _Neo4jDateTimeInput!) {
  CreateProject(name: $name, threatLevel: $threatLevel, L1: $L1, L2: $L2, L3: $L3, createdAt: $createdAt, updatedAt: $createdAt) {
    name
    projectId
  }
}
`

const ALTER_PROJECT_THREAT_LEVEL = gql`
mutation($name: String!, $projectId: ID!, $threatLevel: String!, $L1: Boolean!, $L2: Boolean!, $L3: Boolean!) {
  UpdateProject(name: $name, projectId: $projectId, threatLevel: $threatLevel, L1: $L1, L2: $L2, L3: $L3) {
    name
    threatLevel
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
query($project: String!) {
  Project(filter: {name: $project}) {
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
  ALTER_PROJECT_THREAT_LEVEL,
  ALTER_PROECT_UPDATED,
  ALTER_PROJECT_TAGS,
  QUERY_PROJECTS,
  QUERY_PROJECT,
  QUERY_PROJECT_EXISTS
};