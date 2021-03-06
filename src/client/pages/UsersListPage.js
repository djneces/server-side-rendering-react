import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import { Helmet } from 'react-helmet';

export class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map((user) => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  head() {
    return (
      //SEO meta tags
      <Helmet>
        {/* title of the page  */}
        <title>{`${this.props.users.length} Users Loaded`}</title>
        <meta property='og:title' content='Users App' />
      </Helmet>
    );
  }

  render() {
    return (
      <div>
        {this.head()}
        List of users
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

function loadData(store) {
  //manual dispatch
  return store.dispatch(fetchUsers());
}

function mapStateToProps(state) {
  return { users: state.users };
}

//named export
// export { loadData };

//exporting object and then using spread syntax in Routes, so we don't have naming conflicts with loadData
export default {
  loadData,
  component: connect(mapStateToProps, { fetchUsers })(UsersList),
};
