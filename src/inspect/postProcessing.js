const { generateDate } = require('../util');
const {
  setProjectCodeIntel,
  alterProjectUpdated,
  createProject,
  createScans,
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
const { consumeDCAISarif } = require('../sarif');


const postProcessing = async (meta, currentProjectId, checkSarif, sarif) => {
          // Update Time of change for existing proj.
        // To-Do: Combine these two mutations into one
        /* 
            Temporary patch for ISO String - GQL or APOC Bug
        */
       await alterProjectUpdated(meta.projectName, currentProjectId, generateDate(new Date().toISOString()));
   
    
       // /* Step #2: Record Scan Results */
       const codeIntelEntry = await setProjectCodeIntel(meta);
       await setProjectCodeIntelMeta(meta.projectName, meta.version, codeIntelEntry);
       const scanRecords = await Promise.all(meta.repoResults.map(result => createScans(result)));

       // /* Step #3: Security Graphs */
       if(scanRecords) {
           const prjktScanMeta = await Promise.all(scanRecords.map(scanId => setScansMeta(meta.projectName, meta.version, scanId)));
           if(prjktScanMeta) {
               console.log('Project Scans Meta is set.');
           }
           
       const codeIntlScanMeta = await Promise.all(scanRecords.map(scanId => setCodeIntelScansMeta(codeIntelEntry, meta.projectName, meta.version, scanId)));
       if(codeIntlScanMeta) {
           console.log('CodeIntel Scans Meta is set.');
       }
       }
       if(checkSarif) {
           const sarifEntry = await consumeDCAISarif(sarif, meta.projectName, meta.version);
           await setSarifProjectMeta(sarifEntry, meta.projectName, meta.version);
           await setSarifAttacksMeta(meta.projectName, sarifEntry);
       }
       
       await setVerificationsMeta(meta.projectName);
       await setWeaknessMeta(meta.projectName);
       await setAttacksMeta(meta.projectName);
       await setCodeIntelAttacksMeta(meta.projectName, codeIntelEntry);
       // // SARIF - Projects - Attacks Meta
       // process.stdout.write('Security Graphs are being generated. All tasks are complete.\n');
}

module.exports = {
  postProcessing
}