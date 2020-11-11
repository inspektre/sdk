const { ALTER_CODE_INTEL } = require('../constants');
const { client, handleErrors  } = require('../util');

const setProjectCodeIntel = async (meta) => {
    const { projectName, version, dateScanned, logging, functions, exceptions, classes, urls, scanTags } = meta;
    console.log("set ci for: ", projectName, version, dateScanned);
    // const result = await client.mutate({
    //     mutation: ALTER_CODE_INTEL,
    //     variables: { name }
    // })
    // .catch(error => {
    // handleErrors(error);
    // });

    // if(result && result.data) {
    //     console.log("Project has been deleted or does not exist.");
    // }
};

module.exports = {
    setProjectCodeIntel
}