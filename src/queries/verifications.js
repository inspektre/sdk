const { client, handleErrors  } = require('../util');
const { QUERY_CHAPTER_IDS }= require('../constants');


const queryChapterIds = async (chapterNames) => {
  const result = await client.query({
    query: QUERY_CHAPTER_IDS,
    variables: { chapterNames }
  })
  .catch(error => {
    handleErrors(error);
  });
  if(result && result.data && result.data.Asvs) {
    return result.data.Asvs.map(asvs => asvs.AsvsId)
  }
  return null;
}

module.exports = {
  queryChapterIds
}