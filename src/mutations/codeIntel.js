const { CREATE_CODE_INTEL } = require('../constants');
const { client, handleErrors  } = require('../util');

const setProjectCodeIntel = async (meta) => {
    const { projectName, version, dateScanned } = meta;
    const { logging, functions, exceptions, classes, urls } = meta.tagCounters;
    const result = await client.mutate({
        mutation: CREATE_CODE_INTEL,
        variables: { projectName, version, dateScanned, logging, functions, exceptions, classes, urls }
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