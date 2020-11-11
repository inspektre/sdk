const { generateMeta } = require('./generateMeta');
const { setProjectCodeIntel, alterProjectThreatLevel, alterProjectUpdated } = require('../mutations');

const inspect =  async (data, threatLevel) => {
    const meta = generateMeta(data)
    // Create or Update a project by name with ThreatLevel
    await alterProjectThreatLevel(meta.projectName, threatLevel);
    // Add Updated temporal data
    await alterProjectUpdated(meta.projectName, meta.dateScanned);
    // Set Code Intel
    await setProjectCodeIntel(meta);
};

module.exports = {
    inspect
}