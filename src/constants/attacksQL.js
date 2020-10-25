const gql = require('graphql-tag');

const QUERY_ATTACKS_BY_SEVERITY = gql`
query($severities: [String!]!) {
  AttackPattern(filter: {typicalSeverity_in: $severities}) {
    id
    name
    typicalSeverity
    likelihoodOfAttack
  }
}
`

const QUERY_ATTACKS_BY_LIKELIHOOD = gql`
query($likelihoods: [String!]!) {
  AttackPattern(filter: {likelihoodOfAttack_in: $likelihoods}) {
    id
    name
    typicalSeverity
    likelihoodOfAttack
  }
}
`
const QUERY_ATTACKS_BY_LIKELIHOOD_AND_SEVERITY = gql`
query($likelihoods: [String!]!, $severities: [String!]!) {
  AttackPattern(filter: {AND: [{likelihoodOfAttack_in: $likelihoods}, {typicalSeverity_in: $severities}]}) {
    id
    name
    typicalSeverity
    likelihoodOfAttack
  }
}
`
const QUERY_ATTACKS_BY_TAG = gql`
query($tag: String!) {
  AttackPattern(filter: {description_contains: $tag}) 
  {
    id
    name
    typicalSeverity
    likelihoodOfAttack
  }
}
`
const QUERY_ATTACKS_BY_TAG_SEVRITY = gql`
query($tag: String!, $severities: [String!]!) {
  AttackPattern(filter: {AND: [{description_contains: $tag}, {typicalSeverity_in: $severities}]})
  {
    id
    name
    typicalSeverity
    likelihoodOfAttack
  }
}
`
const QUERY_ATTACKS_BY_TAG_LIKELIHOOD = gql`
query($tag: String!, $likelihoods: [String!]!) {
  AttackPattern(filter: {AND: [{description_contains: $tag}, {likelihoodOfAttack_in: $likelihoods}]})
  {
    id
    name
    typicalSeverity
    likelihoodOfAttack
  }
}
`

const QUERY_ATTACKS_BY_TAG_SEVRITY_LIKELIHOOD = gql`
query($tag: String!, $severities: [String!]!, $likelihoods: [String!]!) {
  AttackPattern(filter: {AND: [{likelihoodOfAttack_in: $likelihoods}, {typicalSeverity_in: $severities}, {description_contains: $tag}]}) 
  {
    id
    name
    typicalSeverity
    likelihoodOfAttack
  }
}
`

const QUERY_ATTACKS_BY_SKILL = gql`
query($skill: String!) {
  AttackPattern(filter: {skillLevels_contains: [$skill]})
  {
    id
    name
    typicalSeverity
    likelihoodOfAttack
  }
}
`

module.exports = {
  QUERY_ATTACKS_BY_LIKELIHOOD,
  QUERY_ATTACKS_BY_SEVERITY,
  QUERY_ATTACKS_BY_LIKELIHOOD_AND_SEVERITY,
  QUERY_ATTACKS_BY_TAG,
  QUERY_ATTACKS_BY_TAG_SEVRITY,
  QUERY_ATTACKS_BY_TAG_LIKELIHOOD,
  QUERY_ATTACKS_BY_TAG_SEVRITY_LIKELIHOOD,
  QUERY_ATTACKS_BY_SKILL
};