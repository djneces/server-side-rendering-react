import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';

// return (
//   <div>
//     <Route exact path='/' component={Home} />
//     <Route exact path='/users' component={UsersList} />
//   </div>
// );

//REACT ROUTER CONFIG REQUIRES DIFFERENT SYNTAX
const Routes = [
  {
    //root component
    //no path => always displays
    ...App,
    //nested components
    routes: [
      {
        //HomePage is an object
        ...HomePage,
        path: '/',
        exact: true,
      },
      {
        //UserListPage is an object
        ...UsersListPage,
        path: '/users',
        exact: true,
      },
    ],
  },
];

export default Routes;
