import React, { Component } from 'react';
import ClaimListing from './ClaimListing.jsx';
import Paper from 'material-ui/Paper';

export default class ClaimList extends Component {

  render() {
    var { claims, cancelClaim, completeClaim } = this.props;
    return (
      <Paper className="ClaimList-container">
        <h1>Your Claims</h1>
        { claims.map((claim) => <ClaimListing { ...claim } key={claim.id} cancelClaim={cancelClaim} completeClaim={completeClaim} />) }
      </Paper>
    )
  }
}
