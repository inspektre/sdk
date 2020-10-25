const { QUERY_PROJECTS, QUERY_PROJECT } = require('../constants');
const { client, handleErrors  } = require('../util');

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


module.exports = { getProjects, getProject };