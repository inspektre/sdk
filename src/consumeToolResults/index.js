const fs = require('fs');
const { CreateToolResults } = require('../mutations');

const supportedDCAIList = [
    'CSRF',
    'XSS',
    'SQL Injection',
    'deserialization',
    'secret'
];

// deepcode.ai SARIF Results
const consumeToolResults = async (toolResult, currentProjectId, codeRepoId, toolName) => {
    const meta = {};
    meta.tags = [];
    meta.projectId = currentProjectId;
    meta.codeRepoId = codeRepoId;
    meta.toolName = toolName;
    meta.createdAt = new Date().toISOString();

    // Parse SARIF file (IF file end with .sarif)
    const sarifContent = JSON.parse(fs.readFileSync(toolResult, 'utf8'));

    for(let i=0; i<sarifContent.runs.length; i++) {
        sarifContent.runs[i].results.forEach(result => {
            if(result.level === 'error') {
                const ruleIdTag = result.ruleId.split('%2F')[result.ruleId.split('%2F').length -1];
                supportedDCAIList.forEach(supportedTag => {
                    if(ruleIdTag.toLowerCase().indexOf(supportedTag.toLocaleLowerCase()) > -1) {
                        meta.tags.push(supportedTag);
                    }
                });
            }
        });
    }
    meta.tags = [...new Set(meta.tags)];
    return await CreateToolResults(meta);
};

module.exports = {
    consumeToolResults
};