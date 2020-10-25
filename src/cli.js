#!/usr/bin/env node

// Copyright (c) 2020, Inspektre
// Author: Uday Korlimarla
const commander = require('commander');
const figures = require('figures');
const chalk = require('chalk');
const packageJson = require('../package.json');
const { Auth, Refresh } = require('./auth');
const { initConfig } = require('./util');
const { getProjects, getProject, getAttackByTag } = require('./queries');
const { getAttackBySeverity, getAttackByLikelihood, getAttackByLikelihoodAndSeverity } = require('./queries');
const { getAttackByTagLikelihood, getAttackByTagSeverity, getAttackByTagSeverityLikelihood } = require('./queries');
const { getAttackBySkill, getWeaknessesOwasp } = require('./queries');
const { deleteProject, alterProjectThreatLevel, alterProjectTags } = require('./mutations');

// Init Commander
const program = new commander.Command();
// Change Default Options and Actions Behavious
program.storeOptionsAsProperties(true).passCommandToAction(true);
// Set Version from package.json
program.version(packageJson.version);
program.description('inspektre - cli'.concat(` v${packageJson.version}`));


program
.command('version', "Display the version of Inspektre-CLI in use.")
.action((action) => {
  const version = action.version || false;
  if(version) {
    console.log('Inspektre-CLI Version: v'.format(packageJson.version));
  }
})
// Intialize
program
.command('init')
.description('Initialize Configuration store in the user\'s home directory')
.option('-v, --verbose', 'output extra information into the CLI')
.action((options) => {
  const verbose = options.verbose || false;
  initConfig(verbose);
})

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
  }).catch(() => {
    console.log(figures.main.cross.concat(" Could not reauthorize this device, Please login again or try after 5 Mins."));
    console.log("We have a leeway time of 300 seconds to prevent exhaustive reauthorizations");
  });
});

program
.command('projects')
.description('Query for projects created on Inspektre')
.option('-l, --list', 'List available Projects on Inspektre')
.option('--project <project>', 'query a project by name')
.option('--remove', 'delete a project by projectname')
.option('--threatLevel <threatLevel>', 'Change project\'s threat level. Instance: L1, L2, L3')
.option('--tags <tags>', 'Add project tags. Instance: Web,SQL,http,tcp,confidentiality,integrity,availability,accesscontrol,authorization')
.option('-v, --verbose', 'output extra information into the CLI')
.action((options) => {
  const list = options.list || false;
  const project = options.project || null;
  const remove = options.remove || false;
  const threatLevel = options.threatLevel || null;
  const tags = options.tags ? options.tags.split(',') : null;

  if(list) {
    getProjects();
  }
  else if (project && remove) {
    deleteProject(project);
  }
  else if (project && threatLevel) {
    alterProjectThreatLevel(project, threatLevel);
  }
  else if (project && tags) {
    console.log("Tags", tags);
    alterProjectTags(project, tags);
  }
  else if (project) {
    getProject(project);
  }
});

program
.command('attacks')
.description('Query for general attack patterns on Inspektre by Likelihood, Severity, Tag OR Skill Level of a malicious actor')
.option('--severity <severity>', 'comma separated values for attack severity. Instance: Critical,High,Medium,Low,"Very Low"')
.option('--likelihood <likelihood>', 'comma separated values for attack likelihood. Instance: High,Medium,Low')
.option('--tag <tag>', 'Simple Attack search  with tag. Instance: web SQL Email')
.option('-v, --verbose', 'output extra information into the CLI')
.option('--skill <skill>', 'Malicious Actor\'s Skill - Instance: High OR Medium OR Low')
.action((options) => {
  const severity = options.severity ? options.severity.split(',') : null;
  const likelihood = options.likelihood ? options.likelihood.split(',') : null;
  // Use this for multiple tags
  // const tags = options.tags ? options.tags.split(',') : null;
  const tag = options.tag ? options.tag : null;
  const skill = options.skill ? options.skill : null;

  if(skill && (tag || severity || likelihood)) {
    process.stdout.write(chalk.red(figures.main.cross).concat(" CLI - Skill cannot yet be combined with sevrity or likelihood or tag\n"));
  }
  else if(tag && severity && likelihood) {
    getAttackByTagSeverityLikelihood(tag, severity, likelihood)
  }
  else if(tag && severity) {
    getAttackByTagSeverity(tag, severity);
  }
  else if(tag && likelihood) {
    getAttackByTagLikelihood(tag, likelihood)
  }
  else if(likelihood && severity) {
    getAttackByLikelihoodAndSeverity(likelihood, severity);
  }
  else if(tag) {
    getAttackByTag(tag);
  }
  else if(severity) {
    getAttackBySeverity(severity);
  }
  else if(likelihood) {
    getAttackByLikelihood(likelihood);
  }
  else if(skill) {
    getAttackBySkill(skill);
  }
  else {
    program.help();
  }
  
});


program
.command('weakness')
.description('Query for weaknesses in Inspektre')
.option('--tags <tags>', 'search for weaknesses by tags - owasp-2017,sw,hw,top-25,architecture,software-fault-patterns')
.action((options) => {
  const tags = options.tags ? options.tags.split(',') : null;
  if(tags) {
    getWeaknessesOwasp(tags);
  }
})


if(process.argv.length > 2) {
  program.parse(process.argv);
}
else {
  program.help();
}