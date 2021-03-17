const {
    deleteProject,
    createProject,
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
const { setProjectCodeRepo, setProjectRepoRelationShip } = require('./codeRepo');
const { createScans, setScansRelationShip } = require('./scans')
const { createSarif } = require('./sarif');


module.exports = {
    deleteProject,
    createProject,
    alterProjectUpdated,
    alterProjectTags,
    setProjectCodeRepo,
    setProjectRepoRelationShip,
    createScans,
    setScansRelationShip,
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