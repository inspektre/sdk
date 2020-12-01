const {
    deleteProject,
    createProject,
    alterProjectThreatLevel,
    alterProjectTags,
    alterProjectUpdated
} = require('./projects');
const {
    setVerificationsMeta,
    setAttacksMeta,
    setWeaknessMeta,
    setScansMeta,
    setProjectCodeIntelMeta,
    setSarifProjectMeta,
    setSarifAttacksMeta,
    setCodeIntelScansMeta,
    setCodeIntelAttacksMeta
} = require('./projectMeta');
const { setProjectCodeIntel } = require('./codeIntel');
const { createScans } = require('./scans')
const { createSarif } = require('./sarif');


module.exports = {
    deleteProject,
    createProject,
    alterProjectThreatLevel,
    alterProjectUpdated,
    alterProjectTags,
    setProjectCodeIntel,
    createScans,
    createSarif,
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