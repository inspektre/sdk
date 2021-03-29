const chalk = require('chalk');
const figures = require('figures');
const { generateMeta } = require('./generateMeta');
const { projectExists, queryChapterIds, queryOrgId } = require('../queries');
const { createProject, setVerifications } = require('../mutations');
const { postProcessing } = require('./postProcessing');
const { handleErrors, generateDate } = require('../util');



const inspect =  async (project, data, checkSarif, sarif, toolName) => {
    // Generate Metadata and add to existing project
    const meta = generateMeta(project, data);
    const existingProject = await projectExists(project);
    let currentProjectId = null;
    // Get the Org ID
    const orgId = await queryOrgId().catch(err => handleErrors(err));
    if(existingProject && existingProject.projectId) {
        currentProjectId = existingProject.projectId;
        await postProcessing(project, meta, currentProjectId, checkSarif, sarif, toolName);
    }
    else {
        process.stderr.write(chalk.red(figures.main.cross).concat(`${meta.projectName} does not exist. Creating a new project with defaults!\n`));
        
        const name = meta.projectName;
        // Risk Thresholds
        const likelihood = 0.6, severity  = 0.6, skill=0.4;
        // Defaulting to OpenSAMM as the first maturity model.
        const maturityModel = 'OpenSAMM';
        const createdAt = {formatted: new Date().toISOString() }
        // const requirements = ["Architecture, Design and Threat Modeling Requirements"];
        currentProjectId = await createProject(
            name,
            type = "web",
            requirements=["Architecture, Design and Threat Modeling Requirements"],
            lane="greenLane",
            likelihood,
            severity,
            skill,
            maturityModel,
            createdAt,
        )
        .catch(err => {
            process.stderr.write(chalk.red(figures.main.cross).concat("An error in creating project. Please ensure unique name OR roles & permissions to proceed.\n"));
            handleErrors(err);
        });

        const AsvsIds = await queryChapterIds(["Architecture, Design and Threat Modeling Requirements"]);
        // Post-Processing
        const codeRepoId = await postProcessing(project, meta, currentProjectId, checkSarif, sarif, toolName)
        .catch(err => {
            handleErrors(err);
        })
        if(AsvsIds) {
            const createdAt = generateDate(new Date().toISOString())
            await Promise.all(AsvsIds.map(AsvsId => setVerifications(orgId, AsvsId, codeRepoId, currentProjectId, createdAt)));
        }
        
    }
};

module.exports = {
    inspect
}