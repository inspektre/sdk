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
const {
  initConfig, 
  fileExists,
  commaSeparatedRequirementsList,
  projectLaneSelection,
  requirementsAvailable,
  availableLanes,
  checkFloatRange,
  modelSelection,
  availableModels
} = require('./util');

const { createProject } = require('./mutations');
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


// Create a new project with mandatory options
program
.command('create')
.description('Create a new project on Inspektre')
.requiredOption('--projectName <projectName>', 'Set name for a new project')
.requiredOption('--choice <choice>', 'Select a project choice')
.requiredOption('--requirements <requirements>', 'select requirements that are relevant', commaSeparatedRequirementsList)
.requiredOption('--lane <lane>', 'Select a project lane', projectLaneSelection)
.requiredOption('--likelihood <likelihood>', 'Project-specific attack likelihood in a range of 0-1', checkFloatRange)
.requiredOption('--severity <severity>', 'Project-specific attack severity in a range of 0-1', checkFloatRange)
.requiredOption('--skill <skill>', 'Project-specific skill rating for a malicious actor in a range of 0-1', checkFloatRange)
.requiredOption('--maturityModel <maturityModel>', 'Choose between OpenSAMM and BSIMM Maturity Models', modelSelection)
.option('-v, --verbose', 'output extra information into the CLI')
.action((options) => {
  // Get a project name
  const { projectName, likelihood, severity, skill, requirements, maturityModel } = options;
  // Get a choice and match - Static list
  const projectOptions = ['web', 'api', 'cli', 'back-end' ,'scripts', 'etl', 'infrastructure', 'firmware', 'hardware'];
  const type = projectOptions.indexOf(options.choice) > -1 ? options.choice: null;
  const lane = availableLanes.find((avLane) => {
    if(avLane == options.lane) {
      return avLane;
    }
  });
  
  // Check if choice is valid
  if (projectName === undefined || projectName === null || type === null || lane === undefined || !maturityModel) {
    process.stderr.write(chalk.red(figures.main.cross).concat(' Please ensure that the correct choices are used '.concat('\n')));
    process.stderr.write(chalk.green("Type inspektre list -h for more options\n"));
    // setTimeout(() => {
    //   process.exit(-1);
    // }, 1000);
  } else {
    // Ensure ISO Formatted is used and  capture locat TZ
    const createdAt = {formatted: new Date().toISOString() }
    const name = projectName;
    // Perform Auth silently
    const verbose = false
    Refresh(verbose)
    .then(() => {
      process.stdout.write(chalk.green('CLI ready for use\n'));
      // Create a 3.5 second delay to assume Auth refresh was successful
      createProject(
        name,
        type,
        requirements,
        lane,
        likelihood,
        severity,
        skill,
        maturityModel,
        createdAt,
      )
      .then(()=> {
        process.stdout.write(chalk.green(figures.main.tick).concat("Project has been created\n"));
        // projectID is ready for consumption
      })
      .catch(err => {
        process.stderr.write(chalk.red(figures.main.cross).concat("An error in creating project. Please ensure unique name OR roles & permissions to proceed.\n"));
      })
    })
    .catch(err => {
      process.stderr.write(chalk.red(figures.main.cross).concat(" Auth Failure\n"));
      process.stdout.write("Try inspektre authorize OR inspektre authorize --headless to start authentication\n");
    })
  }

});

// List options for selections
program
.command('list')
.description('Selection of options for project')
.option('--choices', 'use this option to list available choices for project')
.option('--lanes', 'use this option to list available project lanes')
.option('--maturityModels', 'use this option to list supported maturity models')
.action((options) => {
  // Choices for type of a project
  if(options.choices) {
    requirementsAvailable.forEach(req => {
      process.stdout.write(chalk.green(req.id).concat(' ', req.chapter, '\n'));
    })
  }
  // Choices for project lane
  if(options.lanes) {
    process.stdout.write("Available lanes: ".concat('\n'))
    availableLanes.forEach(avLane => {
      switch(avLane) {
        case 'greenLane':
          process.stdout.write(chalk.green(avLane).concat('\n'));
          break;
        case 'yellowLane':
          process.stdout.write(chalk.yellowBright(avLane).concat('\n'));
          break;
        case 'redLane':
          process.stdout.write(chalk.red(avLane).concat('\n'));
          break;
        default:
          break;
      }
    });
  }
  // Choices for maturity model
  if (options.maturityModels) {
    process.stdout.write("Available Maturity Models: ".concat('\n'))
    availableModels.forEach((avModel, idx) => {
      process.stdout.write(chalk.green(idx).concat(" ", avModel, "\n"));
    })
  }
});

// 
program
.command('inspect')
.description('inspect source-code to security intelligence & security weaknesses')
.requiredOption('-f, --file <file>', 'examine AppInspector from JSON file')
.requiredOption('-p, --project <project>', 'set a project name')
.option('--sarif <sarif>', 'Examine SARIF for intel')
.action((options) => {
  let fileContent;
  const sarif = options.sarif;
  const project = options.project;
  let checkSarif = false;
  if (fileExists(sarif)) {
    checkSarif = true;
  }
  if (fileExists(options.file)) {
    fileContent = require(options.file);
    inspect(project, fileContent, checkSarif, sarif);
  } else {
    process.stderr.write("No suitable code-intel was passed.\n");
  }
});


if(process.argv.length > 2) {
  program.parse(process.argv);
}
else {
  program.help();
}