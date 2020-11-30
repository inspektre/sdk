const fs = require('fs');
const { createSarif } = require('../mutations');

const supportedDCAIList = [
    'CSRF',
    'XSS',
    'SQL Injection',
    'deserialization',
    'secret'
];

// deepcode.ai SARIF Results
const consumeDCAISarif = async (sarifFile, projectName, version) => {
    const dcaiMeta = {};
    dcaiMeta.tags = [];
    dcaiMeta.projectName = projectName;
    dcaiMeta.version = version || '0.0.1';
    dcaiMeta.toolName = 'DeepCode';
    dcaiMeta.createdAt = new Date().toISOString();

    // Parse SARIF file
    const sarifContent = JSON.parse(fs.readFileSync(sarifFile, 'utf8'));
    for(let i=0; i<sarifContent.runs.length; i++) {
        sarifContent.runs[i].results.forEach(result => {
            // To-Do: Verify that errors are valid for security weaknesses 
            // Method: deepcode docs OR contact deepcode.ai
            // Assumption: Security Weaknesses are tagged as errors!
            if(result.level === 'error') {
                const ruleIdTag = result.ruleId.split('%2F')[result.ruleId.split('%2F').length -1];
                supportedDCAIList.forEach(supportedTag => {
                    if(ruleIdTag.toLowerCase().indexOf(supportedTag.toLocaleLowerCase()) > -1) {
                        dcaiMeta.tags.push(supportedTag);
                    }
                });
            }
        });
    }
    dcaiMeta.tags = [...new Set(dcaiMeta.tags)];
    return await createSarif(dcaiMeta);
};

module.exports = {
    consumeDCAISarif
};