import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAlbums } from '../actions/index';

class SearchContainer extends Component {
  componentWillMount() {
    this.props.fetchAlbums(10);
  }

  renderAlbums() {
    if (!this.props.albums.albums) {
      return <div>sry, not yet</div>;
    }
    return <div>{this.props.albums.albums.title}</div>;
  }

  render() {
    console.log(this.props.albums);
    return(
      <div>
        <h3>Ok, so  let me further misuse a component to do something completely different than what it was acutally designed for …</h3>
        <ul>{this.renderAlbums()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { albums: state.albums };
}

export default connect(mapStateToProps, { fetchAlbums })(SearchContainer);