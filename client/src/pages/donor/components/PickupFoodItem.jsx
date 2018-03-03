import React, { Component } from 'react';
import Paper from 'material-ui/paper';

export default class PickupItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extended: false
    }
  }

  render() {
    var { description, quantity, expiry } = this.props;
    return (
      <div className="PickupFoodItem-container">
        <p>{description}</p>
        <p>{quantity}</p>
        <p>{expiry}</p>
      </div>
    )
  }
}
