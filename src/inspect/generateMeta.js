const chalk = require('chalk');
const figures = require('figures');
const { processRepoResults, processTagCounters } = require('./processResults');


const supportedNameTags = [
    "Cryptograph",
    "Authentication",
    "Authorization",
    "LDAP",
    "Deserialization",
    "SQL",
    "Credentials"
];

const generateMeta = (project, data) => {
    const meta = {};
    meta.projectName = project

    meta.repoName = data.metaData.applicationName;
    meta.repoVersion = data.metaData.sourceVersion || '0.0.1';
    
    // This fails 
    meta.dateScanned = {formatted: new Date().toISOString() };
    meta.scanTagsRaw = [];
    meta.scanTags = [];
    
    // Get unique Tags of Interest
    data.metaData.uniqueTags.forEach(uTag => {
        supportedNameTags.forEach(sTag => {
            if(uTag.indexOf(sTag) > -1) {
                meta.scanTagsRaw.push(sTag);
            }
        });
    });
    meta.scanTagsRaw = [...new Set(meta.scanTagsRaw)];
    meta.scanTags = meta.scanTagsRaw.map(tag => {
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