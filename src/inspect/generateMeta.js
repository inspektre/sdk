const { processRepoResults, processTagCounters } = require('./processResults');
const { generateDate } = require('../util');

const supportedNameTags = [
    "Cryptograph",
    "Authentication",
    "Authorization",
    "LDAP",
    "Deserialization",
    "SQL",
    "Credentials"
];

const generateMeta = (data) => {
    const meta = {};
    meta.projectName = data.metaData.applicationName;
    meta.version = data.metaData.sourceVersion || '0.0.1'
    
    // This fails 
    // meta.dateScanned = {formatted: new Date(data.metaData.dateScanned).toISOString() };
    
    // These destructured dates work
    // meta.dateScanned = { year: 2020, month: 11, day: 11 }
    meta.dateScanned = generateDate(data.metaData.dateScanned);
    meta.scanTags = [];
    
    // Get unique Tags of Interest
    data.metaData.uniqueTags.forEach(uTag => {
        supportedNameTags.forEach(sTag => {
            if(uTag.indexOf(sTag) > -1) {
                meta.scanTags.push(sTag);
            }
        });
    });
    meta.scanTags = [...new Set(meta.scanTags)];
    meta.scanTags = meta.scanTags.map(tag => {
        return {name_contains: tag};
    });
    // Get Scan Rule meta
    meta.repoResults = processRepoResults(data.metaData.detailedMatchList, meta.dateScanned, meta.projectName, meta.version);
    // Get App Types meta
    meta.appTypes = data.metaData.appTypes;
    // Get Tag Counter meta
    meta.tagCounters = processTagCounters(data.metaData.tagCounters);

    return meta;
};

module.exports = {
    generateMeta
}