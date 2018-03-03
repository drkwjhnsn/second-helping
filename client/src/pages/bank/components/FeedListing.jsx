import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { RaisedButton } from 'material-ui';
import FoodItem from './FoodItem.jsx';

export default class FeedListing extends Component {
  constructor(props) {
    super(props);

    this.handleClaim = this.handleClaim.bind(this);
  }

  handleClaim() {
    this.props.accept(this.props.id);
  }

  render() {
    // var { name, email, phone, address, foods } = this.props;
    // var streetAddress = address.streetAddress;
    var { foods } = this.props;
    return (
      <Paper className="FeedListing">
        { foods.map((food) => <FoodItem { ...food } key={food.id} />)}
        <RaisedButton fullWidth={true} label="Claim" onClick={this.handleClaim}/>
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
