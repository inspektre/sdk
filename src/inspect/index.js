const chalk = require('chalk');
const figures = require('figures');
const { generateMeta } = require('./generateMeta');
const { projectExists } = require('../queries');
const { createProject } = require('../mutations');
const { postProcessing } = require('./postProcessing');
const { handleErrors } = require('../util');



const inspect =  async (project, data, checkSarif, sarif) => {
    // Generate Metadata and add to existing project
    const meta = generateMeta(project, data);
    const existingProject = await projectExists(meta.projectName);
    let currentProjectId = null;
    if(existingProject && existingProject.projectId) {
        currentProjectId = existingProject.projectId;
        await postProcessing(meta, currentProjectId, checkSarif, sarif);
    }
    else {
        process.stderr.write(chalk.red(figures.main.cross).concat(`${meta.projectName} does not exist. Creating a new project with defaults!\n`));
        
        const name = meta.projectName;
        // Risk Thresholds
        const likelihood =0.6, severity  = 0.6, skill=0.4;
        // Defaulting to OpenSAMM as the first maturity model.
        const maturityModel = 'OpenSAMM';
        const createdAt = {formatted: new Date().toISOString() }

        createProject(
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
        .then((projectId)=> {
            currentProjectId = projectId;
            postProcessing(meta, currentProjectId, checkSarif, sarif)
            .then(
                process.stdout.write(chalk.green(figures.main.tick).concat(" new Project is now ready."))
            )
            .catch(err => {
                handleErrors(err);
            })
        })
        .catch(err => {
            process.stderr.write(chalk.red(figures.main.cross).concat("An error in creating project. Please ensure unique name OR roles & permissions to proceed.\n"));
            handleErrors(err);
        })
        
    }
};

module.exports = {
    inspect
}