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
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

//use this dir as public
app.use(express.static('public'));

app.get('*', (req, res) => {
  const store = createStore();

  //looks at list of routes what the user is attempting to access and returns an array of *components to be rendered*
  //return an array of promises of all pending network requests (from all action creators we are calling)
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    //if loadData func exists -> execute
    return route.loadData ? route.loadData(store) : null;
  });

  //once all promises are resolved, we can render the application
  Promise.all(promises).then(() => {
    //passing req to receive url
    res.send(renderer(req, store));
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
