const { generateMeta } = require('./generateMeta');
const { generateDate } = require('../util');
const {
    setProjectCodeIntel,
    alterProjectThreatLevel,
    alterProjectUpdated,
    createProject,
    createScans
} = require('../mutations');
const { projectExists } = require('../queries');
const { consumeDCAISarif } = require('../sarif');

const inspect =  async (data, threatLevel, checkSarif, sarif) => {
    const meta = generateMeta(data)
    // Create or Update a project by name with ThreatLevel
    if(await projectExists(meta.projectName)) {
        await alterProjectThreatLevel(meta.projectName, threatLevel);
        // Update Time of change for existing proj.
        // To-Do: Combine these two mutations into one
        /* 
            Temporary patch for ISO String - GQL or APOC Bug
        */
        await alterProjectUpdated(meta.projectName, generateDate(new Date().toISOString()));
    }
    else {
        process.stdout.write(`${meta.projectName} does not exist. Creating a new project!\n`);
        await createProject(meta.projectName, threatLevel, meta.dateScanned);
    }

    // // Set Code Intel
    await setProjectCodeIntel(meta);
    meta.repoResults.forEach(repoResult => {
        createScans(repoResult);
    });
    if(checkSarif) {
        await consumeDCAISarif(sarif, meta.projectName, meta.version);
    }
};

module.exports = {
    inspect
}