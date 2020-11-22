const { DELETE_PROJECT, ALTER_THREAT_LEVEL_PROJECT, QUERY_PROJECTS, QUERY_PROJECT, QUERY_PROJECT_EXISTS } = require('./projectQL');
const { ALTER_PROJECT_TAGS, ALTER_PROJECT_THREAT_LEVEL, ALTER_PROECT_UPDATED, CREATE_PROJECT } = require('./projectQL');
const { QUERY_ATTACKS_BY_LIKELIHOOD, QUERY_ATTACKS_BY_SEVERITY } = require('./attacksQL');
const { QUERY_ATTACKS_BY_LIKELIHOOD_AND_SEVERITY, QUERY_ATTACKS_BY_TAG, QUERY_ATTACKS_BY_SKILL } = require('./attacksQL');
const { QUERY_ATTACKS_BY_TAG_SEVRITY, QUERY_ATTACKS_BY_TAG_LIKELIHOOD, QUERY_ATTACKS_BY_TAG_SEVRITY_LIKELIHOOD } = require('./attacksQL');
const { QUERY_WEAKNESS_BY_OWASP } = require('./weaknessQL');
const { QUERY_CODE_INTEL_BY_PROJECT, QUERY_CODE_INTEL_BY_PROJECT_VERSION, CREATE_CODE_INTEL } = require('./codeIntelQL');
const { CREATE_SCANS } = require('./scansQL');

module.exports = {
    ALTER_PROJECT_THREAT_LEVEL,
    DELETE_PROJECT,
    CREATE_PROJECT,
    ALTER_THREAT_LEVEL_PROJECT,
    ALTER_PROECT_UPDATED,
    ALTER_PROJECT_TAGS,
    QUERY_PROJECTS,
    QUERY_PROJECT,
    QUERY_PROJECT_EXISTS,
    QUERY_ATTACKS_BY_LIKELIHOOD,
    QUERY_ATTACKS_BY_SEVERITY,
    QUERY_ATTACKS_BY_LIKELIHOOD_AND_SEVERITY,
    QUERY_ATTACKS_BY_TAG,
    QUERY_ATTACKS_BY_TAG_SEVRITY,
    QUERY_ATTACKS_BY_TAG_LIKELIHOOD,
    QUERY_ATTACKS_BY_TAG_SEVRITY_LIKELIHOOD,
    QUERY_ATTACKS_BY_SKILL,
    QUERY_WEAKNESS_BY_OWASP,
    QUERY_CODE_INTEL_BY_PROJECT,
    QUERY_CODE_INTEL_BY_PROJECT_VERSION,
    CREATE_CODE_INTEL,
    CREATE_SCANS,
};