const { deleteProject, alterProjectThreatLevel, alterProjectTags, alterProjectUpdated } = require('./projects');
const { setProjectCodeIntel } = require('./codeIntel');

module.exports = {
    deleteProject,
    alterProjectThreatLevel,
    alterProjectUpdated,
    alterProjectTags,
    setProjectCodeIntel
};