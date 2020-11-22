const {
    deleteProject,
    createProject,
    alterProjectThreatLevel,
    alterProjectTags,
    alterProjectUpdated
} = require('./projects');
const { setProjectCodeIntel } = require('./codeIntel');
const { createScans } = require('./scans')

module.exports = {
    deleteProject,
    createProject,
    alterProjectThreatLevel,
    alterProjectUpdated,
    alterProjectTags,
    setProjectCodeIntel,
    createScans
};