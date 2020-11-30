const {
    PROJECT_VERIFICATIONS_META,
    PROJECT_ATTACKS_META,
    PROJECT_WEAKNESS_META
} = require('../constants');
const { client, handleErrors } = require('../util');


const setVerificationsMeta = async (projectName) => {
    const result = await client.mutate({
        mutation: PROJECT_VERIFICATIONS_META,
        variables: { projectName }
    })
    .catch(error => {
        handleErrors(error);
    });

    if(result && result.data) {
        console.log("Verifications meta set!");
    }
};

const setAttacksMeta = async (projectName) => {
    const result = await client.mutate({
        mutation: PROJECT_ATTACKS_META,
        variables: { projectName }
    })
    .catch(error => {
        handleErrors(error);
    });

    if(result && result.data) {
        console.log("Attacks meta set!");
    }
};

const setWeaknessMeta = async (projectName) => {
    const result = await client.mutate({
        mutation: PROJECT_WEAKNESS_META,
        variables: { projectName }
    })
    .catch(error => {
        handleErrors(error);
    });

    if(result && result.data) {
        console.log("Weaknesse meta set!");
    }
};

module.exports = {
    setVerificationsMeta,
    setAttacksMeta,
    setWeaknessMeta
};