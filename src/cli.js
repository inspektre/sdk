#!/usr/bin/env node

// Copyright (c) 2020, Inspektre
// Author: Uday Korlimarla
const homedir = require('os').homedir();
const path = require('path');
const commander = require('commander');
const figures = require('figures');
const chalk = require('chalk');
const packageJson = require('../package.json');
const { Auth, Refresh } = require('./auth');
const { initConfig, fileExists, handleRequiredInputs, commaSeparatedRequirementsList } = require('./util');
const {
  getProjects,
  getProject,
  getAttackByTag,
  getAttackBySeverity,
  getAttackByLikelihood,
  getAttackByLikelihoodAndSeverity,
  getAttackByTagLikelihood,
  getAttackByTagSeverity,
  getAttackByTagSeverityLikelihood, 
  getAttackBySkill,
  getWeaknessesOwasp
} = require('./queries');
const { deleteProject, alterProjectThreatLevel, alterProjectTags } = require('./mutations');
const { inspect } = require('./inspect');

const dotenv = require('dotenv');
dotenv.config({ path: path.join(homedir, '/.config/inspektre/.env') });
// Implicityl initalize config directory
initConfig();

// Init Commander
const program = new commander.Command();
// Change Default Options and Actions Behavious
program.storeOptionsAsProperties(true).passCommandToAction(true);
// Set Version from package.json
program.version(packageJson.version);
program.description('inspektre '.concat(` v${packageJson.version}`));

// Version
program
.command('version', "Display the version of Inspektre-CLI in use.")
.action((action) => {
  const version = action.version || false;
  if(version) {
    process.stdout.write('inspektre v'.concat(packageJson.version, '\n'));
  }
});

// Init
program
.command('init')
.description('Initialize Configuration store in the user\'s home directory')
.option('-v, --verbose', 'output extra information into the CLI')
.action((options) => {
  const verbose = options.verbose || false;
  initConfig(verbose);
});
// Get code-intel from file
program
.command('inspect')
.description('inspect source-code for security intelligence')
.requiredOption('-f, --file <file>', 'examine AppInspector from JSON file')
.requiredOption('-p, --project <project>', 'set a project name')
.option('--sarif <sarif>', 'Examine SARIF for intel')
.option('--deepcode', 'Deepcode.ai to SARIF for intel')
.action((options) => {
  let fileContent;
  const deepcode = options.deepcode;
  const sarif = options.sarif;
  const project = options.project;
  let checkSarif = false;
  if (fileExists(sarif) && deepcode) {
    checkSarif = true;
  }
  if (fileExists(options.file)) {
    fileContent = require(options.file);
    inspect(project, fileContent, checkSarif, sarif);
  } else {
    process.stderr.write("No suitable code-intel was passed.\n");
  }
});

// Login Action
program
.command('authorize')
.description('Authorize a Device to interact with Inspektre API')
.option('--headless', 'Input constrained devices - Servers/Containers etc. where there is are no browsers')
.option('-v, --verbose', 'output extra information into the CLI')
.action((options) => {
  const verbose = options.verbose || false;
  const headless = options.headless || false;
  Auth(verbose, headless).catch((err) => {
    if(verbose === true) {
      console.error(err);
    }
  });
});

program
.command('reauthorize')
.description('Reauthorize a Device to interact with Inspektre API')
.option('-v, --verbose', 'output extra information into the CLI')
.action((options) => {
  const verbose = options.verbose || false;
  Refresh(verbose).then(() => {
    if(verbose) {
      console.log(figures.main.tick.concat(" Reauthorization was successful."));
    }
  }).catch((err) => {
    console.log(figures.main.cross.concat(" Could not reauthorize this device, Please login again or try after 5 Mins."));
    console.log("We have a leeway time of 300 seconds to prevent exhaustive reauthorizations");
    console.dir(err);
  });
});


program
.command('create')
.description('Create a new project on Inspektre')
.requiredOption('--projectName <projectName>', 'Set name for a new project')
.requiredOption('--choice <choice>', 'Select a project choice')
.requiredOption('--requirements <requirements>', 'select requirements that are relevant', commaSeparatedRequirementsList)
.option('-v, --verbose', 'output extra information into the CLI')
.action((options) => {
  // Get a project name
  const projectName = options.projectName;
  // Get a choice and match - Static list
  const projectOptions = ['web', 'api', 'cli', 'back-end' ,'scripts', 'etl', 'infrastructure', 'firmware', 'hardware'];
  const choice = projectOptions.indexOf(options.choice) <= -1 ? options.choice: null;
  // Check if choice is valid
  if (choice) {
    process.stderr.write(chalk.red(figures.main.cross).concat(' Please make a project choice.\nAvailable Choices: '.concat(chalk.green(projectOptions.toString(), '\n'))));
  }
  const requirements = options.requirements;
  console.log(requirements);
});


if(process.argv.length > 2) {
  program.parse(process.argv);
}
else {
  program.help();
}