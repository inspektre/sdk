const { generateDate } = require('../util');
const {
  setProjectCodeRepo,
  setProjectRepoRelationShip,
  alterProjectUpdated,
  createScans,
  setScansRelationShip,
  setVerificationsMeta,
  setAttacksMeta,
  setWeaknessMeta,
  setScansMeta,
  setProjectCodeIntelMeta,
  setSarifProjectMeta,
  setSarifAttacksMeta,
  setCodeIntelScansMeta,
  setCodeIntelAttacksMeta
} = require('../mutations');
const { consumeSarif } = require('../sarif');


const postProcessing = async (project, meta, currentProjectId, checkSarif, sarif) => {
  /*
  // Update Time of change for existing proj.
  // To-Do: Combine these two mutations into one
   
      Temporary patch for ISO String - GQL or APOC Bug
  */

  // Update the project time
  await alterProjectUpdated(project, currentProjectId, generateDate(new Date().toISOString()));
  // Create a new entry for repo as a new scan
  const codeRepoId = await setProjectCodeRepo(meta, currentProjectId);
  // Security Graphs
  const repoProjectRelation = await setProjectRepoRelationShip(currentProjectId, codeRepoId);
  
  // Capture Scan details
  const scanRecords = await Promise.all(meta.repoResults.map(result => createScans(result, currentProjectId, codeRepoId)));

  let scansRealtionshipMeta;
  // Security Graphs
  if(scanRecords) {
      scansRealtionshipMeta = await Promise.all(scanRecords.map(scanId => setScansRelationShip(scanId, currentProjectId, codeRepoId)));
  }
        
  // if(checkSarif) {
  //     const sarifEntry = await consumeSarif(sarif, meta.projectName, meta.version);
  //     await setSarifProjectMeta(sarifEntry, meta.projectName, meta.version);
  //     await setSarifAttacksMeta(meta.projectName, sarifEntry);
  // }
  
  //  await setVerificationsMeta(meta.projectName);
  //  await setWeaknessMeta(meta.projectName);
  //  await setAttacksMeta(meta.projectName);
  //  await setCodeIntelAttacksMeta(meta.projectName, codeIntelEntry);
    // SARIF - Projects - Attacks Meta
    process.stdout.write('Security Graphs generated. All tasks are complete.\n');
}

module.exports = {
  postProcessing
}