import React, { Component } from 'react';
import FeedListing from './FeedListing.jsx';
import Paper from 'material-ui/Paper';

export default class PickupFeed extends Component {

  render() {
    var { pickups, accept } = this.props;
    return (
      <Paper className="PickupFeed-container">
        <h1>Available Pickups</h1>
        { pickups.map((pickup) => <FeedListing { ...pickup } key={pickup.id} accept={accept}/>) }
      </Paper>
    )
  }
}
