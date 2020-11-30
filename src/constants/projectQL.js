const gql = require('graphql-tag');

const DELETE_PROJECT = gql`
mutation($name: String!) {
  DeleteProject(name: $name) {
    name
  }
}
`
const CREATE_PROJECT = gql`
mutation($name: String!, $threatLevel: String!, $L1: Boolean!, $L2: Boolean!, $L3: Boolean!, $createdAt: _Neo4jDateTimeInput!) {
  CreateProject(name: $name, threatLevel: $threatLevel, L1: $L1, L2: $L2, L3: $L3, createdAt: $createdAt, updatedAt: $createdAt) {
    name
  }
}
`

const ALTER_PROJECT_THREAT_LEVEL = gql`
mutation($name: String!, $threatLevel: String!, $L1: Boolean!, $L2: Boolean!, $L3: Boolean!) {
  UpdateProject(name: $name, threatLevel: $threatLevel, L1: $L1, L2: $L2, L3: $L3) {
    name
    threatLevel
  }
}
`
const ALTER_PROECT_UPDATED = gql`
mutation($name: String!, $updatedAt: _Neo4jDateTimeInput!) {
  MergeProject(name: $name, updatedAt: $updatedAt) {
    name
  }
}
`

const ALTER_PROJECT_TAGS = gql`
mutation($name: String!, $tags: [String]) {
  MergeProject(name: $name, tags: $tags) {
    name
    tags
  }
}
`

const QUERY_PROJECTS = gql`
query {
  Project {
    name
    threatLevel
    L1
    L2
    L3
    L4
    tags
    tier
    verifications {
      stage
      serial
    }
    weaknessPatterns {
      id
      name
      confidentiality
      integrity
      availability
      accessControl
    }
    attackPatterns {
      id
      name
      typicalSeverity
      likelihoodOfAttack
    }
    requirementsMet {
      stage
      serial
    }
    weaknessSuppressed {
      id
      name
      type
    }
    attacksSuppressed {
			id
      name
      typicalSeverity
      likelihoodOfAttack
    }
  }
}
`
const QUERY_PROJECT_EXISTS = gql`
query($project: String!) {
  Project(filter: {name: $project}) {
    name
  }
}
`

const QUERY_PROJECT = gql`
query($project: String!) {
  Project(filter: {name: $project}) {
    name
    threatLevel
    L1
    L2
    L3
    L4
    tags
    tier
    verifications {
      stage
      serial
    }
    weaknessPatterns {
      id
      name
      type
    }
    attackPatterns {
      id
      name
      typicalSeverity
      likelihoodOfAttack
    }
    requirementsMet {
      stage
      serial
    }
    weaknessSuppressed {
      id
      name
      type
    }
    attacksSuppressed {
	  id
      name
      typicalSeverity
      likelihoodOfAttack
    }
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