const { CREATE_CODE_INTEL } = require('../constants');
const { client, handleErrors  } = require('../util');

const setProjectCodeIntel = async (meta) => {
    const scanTags = meta.scanTagsRaw;
    const { projectName, version, dateScanned } = meta;
    const { logging, functions, exceptions, classes, urls } = meta.tagCounters;
    const result = await client.mutate({
        mutation: CREATE_CODE_INTEL,
        variables: { projectName, version, dateScanned, logging, functions, exceptions, classes, urls, scanTags }
    })
    .catch(error => {
        handleErrors(error);
    });

    if(result && result.data) {
        console.log("code intel is set");
        return result.data.CreateCodeIntel.id;
    }
};

module.exports = {
    setProjectCodeIntel
}