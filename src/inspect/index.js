const { generateMeta } = require('./generateMeta');

const inspect = (data) => {
    const meta = generateMeta(data);
    // Create By Merging project
    alterProjectThreatLevel(project, threatLevel, updated);
    console.log(meta);
}


module.exports = {
    inspect
}