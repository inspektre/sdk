const { generateMeta } = require('./generateMeta');
const { projectExists } = require('../queries');
const { postProcessing } = require('./postProcessing');



const inspect =  async (project, data, checkSarif, sarif) => {
    // Generate Metadata and add to existing project
    const meta = generateMeta(project, data);
    const existingProject = await projectExists(meta.projectName);
    let projectId = null;
    if(existingProject && existingProject.projectId) {
        projectId = existingProject.projectId;
        await postProcessing(meta, projectId, checkSarif, sarif);
    }
    else {
        process.stderr.write(chalk.red(figures.main.cross).concat(`${meta.projectName} does not exist.!\n`));
        setTimeout(() => {
            process.exit(-1);
        }, 1500);
    }
};

module.exports = {
    inspect
}