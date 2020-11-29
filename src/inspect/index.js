const { generateMeta } = require('./generateMeta');
const { generateDate } = require('../util');
const {
    setProjectCodeIntel,
    alterProjectThreatLevel,
    alterProjectUpdated,
    createProject,
    createScans,
    setVerificationsMeta,
    setAttacksMeta,
    setWeaknessMeta
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

    // FIX  CodeIntel and Sarif

    // // Set Code Intel
    await setProjectCodeIntel(meta);
    const scanRecordsPromise = new Promise((resolve, reject) => {
        try {
            const scanRecords = meta.repoResults.map(repoResult => {
                return createScans(repoResult);
            });
            resolve(scanRecords);
        }
        catch(err) {
            reject(err);
        }    
    });
    
    if(checkSarif) {
        await consumeDCAISarif(sarif, meta.projectName, meta.version);
    }

    // Set META
    await setVerificationsMeta(meta.projectName);
    await setAttacksMeta(meta.projectName);
    await setWeaknessMeta(meta.projectName);
    // TO-Do: 
    // Set All Metas

    // scanRecordsPromise.then(recs => {
    //     recs.forEach(r => console.log(r));
    // })
    // .catch(err => {
    //     process.stderr.write('Failed retrieving scan records');
    // })
};

module.exports = {
    inspect
}