import React from 'react';
import { renderToString } from 'react-dom/server';
//router for server side
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import Routes from '../client/Routes';

export default (req, store, context) => {
  //generate content - turn components into HTML
  //JSX on the server - run webpack, then run the bundle.js
  const content = renderToString(
    <Provider store={store}>
      {/* context prop needed, {}, we need location (it's on the server, it can't read the url bar) */}
      <StaticRouter location={req.path} context={context}>
        {/* Routes now is an array (we use react router config) */}
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  /*tell the browser to download the public bundle.js*/
  //no white space, or we get warning in the browser
  //we have to pass the store data from the server to the client (as initial state)
  //serialize protects against malicious xss attacks - this is vulnerable part, react protects, but only what renders
  //helmet.title => title in the tab
  return `<html><head>${helmet.title.toString()}${helmet.meta.toString()}<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"></head><body><div id="root">${content}</div><script>window.INITIAL_STATE = ${serialize(
    store.getState()
  )}</script><script src="bundle.js"></script></body></html>`;
};
