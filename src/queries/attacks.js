const { client, handleErrors  } = require('../util');
const { QUERY_ATTACKS_BY_LIKELIHOOD, QUERY_ATTACKS_BY_SEVERITY, QUERY_ATTACKS_BY_SKILL } = require('../constants');
const { QUERY_ATTACKS_BY_TAG, QUERY_ATTACKS_BY_LIKELIHOOD_AND_SEVERITY } = require('../constants');
const { QUERY_ATTACKS_BY_TAG_SEVRITY, QUERY_ATTACKS_BY_TAG_LIKELIHOOD, QUERY_ATTACKS_BY_TAG_SEVRITY_LIKELIHOOD } = require('../constants');

const getAttackBySeverity = async (severities) => {
    const result = await client.query({
      query: QUERY_ATTACKS_BY_SEVERITY,
      variables: { severities }
    })
    .catch(error => {
      handleErrors(error);
    });
  
    if(result) {
      console.log(result.data.AttackPattern);
    }
};

const getAttackByLikelihood = async (likelihoods) => {
    const result = await client.query({
      query: QUERY_ATTACKS_BY_LIKELIHOOD,
      variables: { likelihoods }
    })
    .catch(error => {
      handleErrors(error);
    });
  
    if(result) {
      console.log(result.data.AttackPattern);
    }
};

const getAttackByLikelihoodAndSeverity = async (likelihoods, severities) => {
  const result = await client.query({
    query: QUERY_ATTACKS_BY_LIKELIHOOD_AND_SEVERITY,
    variables: { likelihoods, severities }
  })
  .catch(error => {
    handleErrors(error);
  });

  if(result) {
    console.log(result.data.AttackPattern);
  }
};


const getAttackByTag = async (tag) => {
  const result = await client.query({
    query: QUERY_ATTACKS_BY_TAG,
    variables: { tag }
  })
  .catch(error => {
    handleErrors(error);
  });

  if(result) {
    console.log(result.data.AttackPattern);
  }
};

const getAttackByTagSeverity = async (tag, severities) => {
  const result = await client.query({
    query: QUERY_ATTACKS_BY_TAG_SEVRITY,
    variables: { tag, severities }
  })
  .catch(error => {
    handleErrors(error);
  });

  if(result) {
    console.log(result.data.AttackPattern);
  }
};
const getAttackByTagLikelihood = async (tag, likelihoods) => {
  const result = await client.query({
    query: QUERY_ATTACKS_BY_TAG_LIKELIHOOD,
    variables: { tag, likelihoods }
  })
  .catch(error => {
    handleErrors(error);
  });

  if(result) {
    console.log(result.data.AttackPattern);
  }
};

const getAttackByTagSeverityLikelihood = async (tag, likelihoods, severities) => {
  const result = await client.query({
    query: QUERY_ATTACKS_BY_TAG_SEVRITY_LIKELIHOOD,
    variables: { tag, severities, likelihoods }
  })
  .catch(error => {
    handleErrors(error);
  });

  if(result) {
    console.log(result.data.AttackPattern);
  }
};

const getAttackBySkill = async(skill) => {
  const result = await client.query({
    query: QUERY_ATTACKS_BY_SKILL,
    variables: { skill }
  })
  .catch(error => {
    handleErrors(error);
  });

  if(result) {
    console.log(result.data.AttackPattern);
  }
};

module.exports = {
  getAttackBySeverity,
  getAttackByLikelihood,
  getAttackByLikelihoodAndSeverity,
  getAttackByTag,
  getAttackByTagLikelihood,
  getAttackByTagSeverity,
  getAttackByTagSeverityLikelihood,
  getAttackBySkill
};