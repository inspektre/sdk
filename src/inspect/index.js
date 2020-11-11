const { generateMeta } = require('./generateMeta');
const { setProjectCodeIntel, alterProjectThreatLevel, alterProjectUpdated } = require('../mutations');

const inspect =  (data, threatLevel) => {
    const meta = generateMeta(data)
    // Create or Merge a project by name with ThreatLevel
    alterProjectThreatLevel(meta.projectName, threatLevel);
    // Add Updated temporal data
    alterProjectUpdated(meta.projectName, meta.dateScanned);
    // Set Code Intel
    setProjectCodeIntel(meta);
};


module.exports = {
    inspect
}