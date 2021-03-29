const gql = require('graphql-tag');

const QUERY_WEAKNESS_BY_OWASP = gql`
query($tags: [String!]!) {
  WeaknessPattern(filter: {type_in: $tags}) {
    id
    type
    name
    confidentiality
    integrity
    availability
    accessControl
  }
}
`


module.exports = {
  QUERY_WEAKNESS_BY_OWASP 
};