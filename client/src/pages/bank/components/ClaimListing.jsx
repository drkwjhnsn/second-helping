import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { RaisedButton } from 'material-ui';
import FoodItem from './FoodItem.jsx';

export default class ClaimListing extends Component {
  constructor(props) {
    super(props);

    this.cancelClaim = this.cancelClaim.bind(this);
    this.completeClaim = this.completeClaim.bind(this);
  }

  cancelClaim() {
    var { cancelClaim, id } = this.props;
    cancelClaim(id);
  }

  completeClaim() {
    var { completeClaim, id } = this.props;
    completeClaim(id);
  }


  render() {
    // var { name, email, phone, address, foods } = this.props;
    // var streetAddress = address.streetAddress;
    var { foods } = this.props;
    return (
      <Paper className="ClaimListing-container">
        { foods.map((food) => <FoodItem { ...food } key={food.id} />) }
        <div className="ClaimListing-button-cluster">
          <RaisedButton label="Cancel" onClick={this.cancelClaim}/>
          <RaisedButton label="Complete" onClick={this.completeClaim}/>
        </div>
      </Paper>
    );
  }
}

// <CardHeader
//   title={name}
//   subtitle={streetAddress}
//   actAsExpander={true}
//   showExpandableButton={true}
// />
