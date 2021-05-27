// const express = require('express');
// const React = require('react');
// //this syntax to make work common JS modules with ES2015 modules
// const renderToString = require('react-dom/server').renderToString;
// const Home = require('./client/components/Home').default;

//since we use webpack, we can use the same syntax for client and server
// babel polyfill needed for async await
import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

//proxy route '/api'
app.use(
  '/api',
  proxy('http://react-ssr-api.herokuapp.com', {
    //set up specifically for this api, due to security with OAuth
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:3000';
      return opts;
    },
  })
);

//use this dir as public
app.use(express.static('public'));

app.get('*', (req, res) => {
  //pass req with cookie
  const store = createStore(req);

  //looks at list of routes what the user is attempting to access and returns an array of *components to be rendered*
  //return an array of promises of all pending network requests (from all action creators we are calling) or null
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      //if loadData func exists -> execute
      return route.loadData ? route.loadData(store) : null;
    })
    .map((promise) => {
      if (promise) {
        //individually wrap promises in promise, so it doesn't fail later in Promise.all(that expects it's all going to resolve)
        return new Promise((resolve, reject) => {
          //we resolve no matter what
          promise.then(resolve).catch(resolve);
        });
      }
    });

  //once all promises are resolved, we can render the application
  Promise.all(promises).then(() => {
    //context to handle 404 page
    const context = {};
    //passing req to receive url
    const content = renderer(req, store, context);

    if (context.url) {
      //redirect on server if in url in the context object (<Redirect /> in requireAuth.js)
      return res.redirect(301, context.url);
    }

    if (context.notFound) {
      res.status(404);
    }
    res.send(content);
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
