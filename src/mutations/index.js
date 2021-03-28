const {
    deleteProject,
    createProject,
    alterProjectTags,
    alterProjectUpdated
} = require('./projects');

const { setProjectCodeRepo, setProjectRepoRelationShip } = require('./codeRepo');
const { createScans, setScansRelationShip } = require('./scans')
const { CreateToolResults } = require('./toolResults');
const { setVerifications } = require('./verifications');


module.exports = {
    deleteProject,
    createProject,
    alterProjectUpdated,
    alterProjectTags,
    setProjectCodeRepo,
    setProjectRepoRelationShip,
    createScans,
    setScansRelationShip,
    CreateToolResults,
    setVerifications
};