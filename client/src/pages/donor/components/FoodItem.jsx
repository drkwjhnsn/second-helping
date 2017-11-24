import React, { Component } from 'react';
import Paper from 'material-ui/paper';
import { TextField } from 'material-ui';

export default class FoodItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extended: false
    }

    this.handleDescription = this.handleDescription.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleExpiry = this.handleExpiry.bind(this);
  }

  handleDescription(e) {
    var { no, handleItemChange } = this.props;
    handleItemChange(no, 'description', e);
  }

  handleQuantity(e) {
    var { no, handleItemChange } = this.props;
    handleItemChange(no, 'quantity', e);
  }

  handleExpiry(e) {
    var { no, handleItemChange } = this.props;
    handleItemChange(no, 'expiry', e);
  }

  render() {
    var { description, quantity, expiry } = this.props;
    return (
      <Paper className="FoodItem-container">
        <TextField
          floatingLabelText="Description"
          value={description || ''}
          onChange={this.handleDescription}/>
        <TextField
          floatingLabelText="Quantity"
          value={quantity || ''}
          onChange={this.handleQuantity}/>
        <TextField
          floatingLabelText="Expiry"
          value={expiry || ''}
          onChange={this.handleExpiry}/>
      </Paper>
    )
  }
}
