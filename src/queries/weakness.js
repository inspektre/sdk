const { client, handleErrors  } = require('../util');
const { QUERY_WEAKNESS_BY_OWASP } = require('../constants');


const getWeaknessesOwasp = async (tags) => {
    const result = await client.query({
      query: QUERY_WEAKNESS_BY_OWASP,
      variables: { tags }
    })
    .catch(error => {
      handleErrors(error);
    });
  
    if(result) {
        console.log(result.data.WeaknessPattern);
    }
};

module.exports = { getWeaknessesOwasp };