const { generateMeta } = require('./generateMeta');
const { setProjectCodeIntel, alterProjectThreatLevel, alterProjectUpdated, createProject } = require('../mutations');
const { projectExists } = require('../queries')

const inspect =  async (data, threatLevel) => {
    const meta = generateMeta(data)
    // Create or Update a project by name with ThreatLevel
    if(await projectExists(meta.projectName)) {
        await alterProjectThreatLevel(meta.projectName, threatLevel);
    }
    else {
        process.stdout.write(`${meta.projectName} does not exist. Creating a new project!\n`);
        await createProject(meta.projectName, threatLevel);
    }
    // Add Updated temporal data
    await alterProjectUpdated(meta.projectName, meta.dateScanned);
    // // Set Code Intel
    await setProjectCodeIntel(meta);
};

module.exports = {
    inspect
}