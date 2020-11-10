const gql = require('graphql-tag');

const DELETE_PROJECT = gql`
mutation($name: String!) {
  DeleteProject(name: $name) {
    name
  }
}
`
const ALTER_PROJECT_THREAT_LEVEL = gql`
mutation($name: String!, $threatLevel: String!, $L1: Boolean!, $L2: Boolean!, $L3: Boolean!, $updated: _Neo4jDateTimeInput) {
  MergeProject(name: $name, threatLevel: $threatLevel, L1: $L1, L2: $L2, L3: $L3, updated: $updated) {
    name
    threatLevel
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
    repos {
        name
    }
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
    repos {
        name
    }
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
  ALTER_PROJECT_THREAT_LEVEL,
  ALTER_PROJECT_TAGS,
  QUERY_PROJECTS,
  QUERY_PROJECT
};