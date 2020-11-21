const { getProjects, getProject, projectExists } = require('./projects');
const { getAttackBySeverity, getAttackByLikelihood, getAttackByLikelihoodAndSeverity, getAttackByTag } = require('./attacks');
const {  getAttackByTagLikelihood, getAttackByTagSeverity, getAttackByTagSeverityLikelihood } = require('./attacks');
const { getAttackBySkill } = require('./attacks');
const { getWeaknessesOwasp } = require('./weakness');

module.exports = { 
    getProjects,
    getProject,
    projectExists,
    getAttackBySeverity,
    getAttackByLikelihood,
    getAttackByLikelihoodAndSeverity,
    getAttackByTag,
    getAttackByTagLikelihood,
    getAttackByTagSeverity,
    getAttackByTagSeverityLikelihood,
    getAttackBySkill,
    getWeaknessesOwasp
};