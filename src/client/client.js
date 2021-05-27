//startup point for the client side application
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import Routes from './Routes';
import reducers from './reducers';

const axiosInstance = axios.create({
  baseURL: '/api',
});

//client side redux store
//we replace initial state of the store {} with a state coming from the server (renderer.js), resolved error 'didn't expect li in ul'
const store = createStore(
  reducers,
  window.INITIAL_STATE,
  //passing extra 3rd argument to redux thunk (dispatch, getState, { api, whatever })
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

//re-render into server-side rendered div with id root (index.js)
//we are not replacing the existing content, we just wiring all the necessary event handlers etc..
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
