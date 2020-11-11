const { generateMeta } = require('./generateMeta');
const { setProjectCodeIntel, alterProjectThreatLevel, alterProjectUpdated } = require('../mutations');

const inspect =  (data, threatLevel) => {
    const meta = generateMeta(data);
    // Create By Merging project
    const tempDate = {
        year: 2020,
        month: 11,
        date: 11,
        hour: 11,
        minute: 11,
        second: 11
    }
    
    // Create or Merge a project by name with ThreatLevel
    // alterProjectThreatLevel(meta.projectName, threatLevel);
    // console.log(new Date(meta.dateScanned).toISOString());
    alterProjectUpdated(meta.projectName, { formatted: new Date(meta.dateScanned).toISOString() });

    // setProjectCodeIntel(meta);
}


module.exports = {
    inspect
}