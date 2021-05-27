import React from 'react';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';

//REACT ROUTER CONFIG REQUIRES DIFFERENT SYNTAX
// return (
//   <div>
//     <Route exact path='/' component={Home} />
//     <Route exact path='/users' component={UsersList} />
//   </div>
// );
const Routes = [
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
];

export default Routes;
