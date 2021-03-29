const { getProjects, getProject, projectExists } = require('./projects');
const {
    getAttackBySeverity,
    getAttackByLikelihood,
    getAttackByLikelihoodAndSeverity,
    getAttackByTag,
    getAttackByTagLikelihood,
    getAttackByTagSeverity,
    getAttackByTagSeverityLikelihood,
    getAttackBySkill
} = require('./attacks');
const { getWeaknessesOwasp } = require('./weakness');
const { queryChapterIds } = require('./verifications');
const { queryOrgId } = require('./org')

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
    getWeaknessesOwasp,
    queryChapterIds,
    queryOrgId,
};