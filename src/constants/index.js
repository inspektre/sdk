const { DELETE_PROJECT, ALTER_THREAT_LEVEL_PROJECT, QUERY_PROJECTS, QUERY_PROJECT } = require('./projectQL');
const { ALTER_PROJECT_TAGS, ALTER_PROJECT_THREAT_LEVEL } = require('./projectQL');
const { QUERY_ATTACKS_BY_LIKELIHOOD, QUERY_ATTACKS_BY_SEVERITY } = require('./attacksQL');
const { QUERY_ATTACKS_BY_LIKELIHOOD_AND_SEVERITY, QUERY_ATTACKS_BY_TAG, QUERY_ATTACKS_BY_SKILL } = require('./attacksQL');
const { QUERY_ATTACKS_BY_TAG_SEVRITY, QUERY_ATTACKS_BY_TAG_LIKELIHOOD, QUERY_ATTACKS_BY_TAG_SEVRITY_LIKELIHOOD } = require('./attacksQL');
const { QUERY_WEAKNESS_BY_OWASP } = require('./weaknessQL');

module.exports = {
    ALTER_PROJECT_THREAT_LEVEL,
    DELETE_PROJECT,
    ALTER_THREAT_LEVEL_PROJECT,
    ALTER_PROJECT_TAGS,
    QUERY_PROJECTS,
    QUERY_PROJECT,
    QUERY_ATTACKS_BY_LIKELIHOOD,
    QUERY_ATTACKS_BY_SEVERITY,
    QUERY_ATTACKS_BY_LIKELIHOOD_AND_SEVERITY,
    QUERY_ATTACKS_BY_TAG,
    QUERY_ATTACKS_BY_TAG_SEVRITY,
    QUERY_ATTACKS_BY_TAG_LIKELIHOOD,
    QUERY_ATTACKS_BY_TAG_SEVRITY_LIKELIHOOD,
    QUERY_ATTACKS_BY_SKILL,
    QUERY_WEAKNESS_BY_OWASP
};