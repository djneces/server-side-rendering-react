import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../client/reducers';

//server side redux store
export default () => {
  const store = createStore(reducers, {}, applyMiddleware(thunk));
  return store;
};
