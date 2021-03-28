const { QUERY_ORG } = require('../constants');
const { client, handleErrors  } = require('../util');

const queryOrgId = async () => {
  const result = await client.query({
    query: QUERY_ORG
  })
  .catch(error => {
    handleErrors(error);
  });
  if(result && result.data && result.data.Org.length > 0) {
    return result.data.Org[0].id;
  }
}


module.exports = {
  queryOrgId 
}