const gql = require('graphql-tag');


const QUERY_ORG = gql`
query {
  Org {
    id
  }
}
`

module.exports = {
  QUERY_ORG
}