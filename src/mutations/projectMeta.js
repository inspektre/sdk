const {
    PROJECT_VERIFICATIONS_META,
    PROJECT_ATTACKS_META,
    PROJECT_WEAKNESS_META,
    PROJECT_SCANS_META,
    PROJECT_CODEINTEL_META,
    SARIF_PROJECTS_META,
    SARIF_ATTACKS_META,
    CODE_INTEL_SCANS_META,
    CODE_INTEL_ATTACKS_META
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

const setScansMeta = async (projectName, version, scanId) => {
    const result = await client.mutate({
        mutation: PROJECT_SCANS_META,
        variables: { projectName, version, scanId }
    })
    .catch(error => {
        handleErrors(error);
    });

    if(result && result.data) {
        return result.data.ScansProjectMeta;
    }
};

const setProjectCodeIntelMeta = async (projectName, version, codeIntelId) => {
    const result = await client.mutate({
        mutation: PROJECT_CODEINTEL_META,
        variables: { projectName, version, codeIntelId}
    })
    .catch(error => {
        handleErrors(error);
    });

    if(result && result.data) {
        console.log("Project's CodeIntel is now set.");
    }
};

const setSarifProjectMeta = async (sarifId, projectName, version) => {
    const result = await client.mutate({
        mutation: SARIF_PROJECTS_META,
        variables: {sarifId, projectName, version }
    })
    .catch(error => {
        handleErrors(error);
    });

    if(result && result.data) {
        console.log("Project's SARIF meta is complete.");
    }
};

const setCodeIntelScansMeta = async (codeIntelId, projectName, version, scanId) => {
    const result = await client.mutate({
        mutation: CODE_INTEL_SCANS_META,
        variables: { codeIntelId, projectName, version, scanId }
    })
    .catch(error => {
        handleErrors(error);
    });

    if(result && result.data) {
        return result.data.CodeIntelScansMeta;
    }
};

const setCodeIntelAttacksMeta = async (projectName, codeIntelId) => {
    const result = await client.mutate({
        mutation: CODE_INTEL_ATTACKS_META,
        variables: { projectName, codeIntelId }
    })
    .catch(error => {
        handleErrors(error);
    });

    if(result && result.data) {
        return result.data.CodeIntelAttacksMeta;
    }
};

const setSarifAttacksMeta = async (projectName, sarifId) => {
    const result = await client.mutate({
        mutation: SARIF_ATTACKS_META,
        variables: { projectName, sarifId }
    })
    .catch(error => {
        handleErrors(error);
    });

    if(result && result.data) {
        return result.data.SarifAttacksMeta;
    }
};

module.exports = {
    setVerificationsMeta,
    setAttacksMeta,
    setWeaknessMeta,
    setScansMeta,
    setProjectCodeIntelMeta,
    setSarifProjectMeta,
    setSarifAttacksMeta,
    setCodeIntelScansMeta,
    setCodeIntelAttacksMeta
};