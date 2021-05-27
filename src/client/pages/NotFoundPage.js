import React from 'react';

//static router renames context to staticContext
const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return <h1>Page not found!</h1>;
};

export default { component: NotFoundPage };
