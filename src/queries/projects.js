const { QUERY_PROJECTS, QUERY_PROJECT, QUERY_PROJECT_EXISTS } = require('../constants');
const { client, handleErrors  } = require('../util');

const projectExists = async (project) => {
  const name = project;
  const result = await client.query({
    query: QUERY_PROJECT_EXISTS,
    variables: { name }
  })
  .catch(error => {
    handleErrors(error);
  });
  if(result && result.data && result.data.Project.length > 0) {
    return result.data.Project[0];
  }
  return null;
};

const getProjects = async () => {
  const result = await client.query({
    query: QUERY_PROJECTS
  })
  .catch(error => {
    handleErrors(error);
  });

  if(result) {
    console.log(result.data.Project);
  }
};

const getProject = async (project) => {
  const result = await client.query({
    query: QUERY_PROJECT,
    variables: { project }
  })
  .catch(error => {
    handleErrors(error);
  });

  if(result && result.data && result.data.Project.length > 0) {
    console.log(result.data.Project[0]);
  }
};


module.exports = { projectExists, getProjects, getProject };