import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions/index';
import styles from './CollectionContainer';

class CollectionContainer extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  renderUser() {
    if(!this.props.users.users) {
      return <div>Ok, hold on there for a second!</div>;
    }
    return this.props.users.users.map((user) => {
      return(<li key={user.id} className={ styles.listitem }>{user.name}</li>);
    });
  }

  render() {
    console.log(this.props.users);
    return(
      <div>
        <h3>Collection of User</h3>
        <ul>{this.renderUser()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

export default connect(mapStateToProps, { fetchUsers })(CollectionContainer);