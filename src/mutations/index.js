const {
    deleteProject,
    createProject,
    alterProjectThreatLevel,
    alterProjectTags,
    alterProjectUpdated
} = require('./projects');
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
    createSarif
};