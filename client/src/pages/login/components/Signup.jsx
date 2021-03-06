import React, { Component } from 'react';
import { RaisedButton, TextField } from 'material-ui';
import { RadioButtonGroup, RadioButton } from 'material-ui/RadioButton'

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'DONOR',
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      email: '',
      password: '',
      confirm: '',
    }
    this.handleType = this.handleType.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.obscure = this.obscure.bind(this);
    this.keyQuery = this.keyQuery.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleType(e) {
    var type = e.target.value;
    this.setState({ type });
  }

  handleName(e) {
    var name = e.target.value;
    this.setState({ name });
  }

  handleAddress(e) {
    var address = e.target.value;
    this.setState({ address });
  }

  handleCity(e) {
    var city = e.target.value;
    this.setState({ city });
  }

  handleState(e) {
    var state = e.target.value;
    this.setState({ state });
  }

  handleZip(e) {
    var zip = e.target.value;
    this.setState({ zip });
  }

  handleEmail(e) {
    var email = e.target.value;
    this.setState({ email });
  }

  handleConfirm(e) {
    var confirm = e.target.value;
    this.setState({ confirm });
  }

  handlePassword(e) {
    var password = e.target.value;
    this.setState({ password });
  }

  obscure(e) {
    e.target.setAttribute('type', 'password');
  }

  clearFields() {
    this.setState({
        type: 'DONOR',
        name: 'name',
        address: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        password: '',
        confirm: ''
      });
    this.nameField.value = '';
    this.addressField.value = '';
    this.cityField.value = '';
    this.stateField.value = '';
    this.zipField.value = '';
    this.emailField.value = '';
    this.passwordField.value = '';
    this.confirmField.value = '';
  }

  keyQuery(e) {
    if (e.keyCode === 13) this.handleSubmit();
  }

  handleSubmit() {
    var { type, name, address, city, state, zip, email, password } = this.state;
    this.props.signup(type, name, address, city, state, zip, email, password);
    this.clearFields();
  }

  render() {
    return (
      <div className="signup">
        <RadioButtonGroup
          name="accountType"
          valueSelected={this.state.type}
          onChange={this.handleType}>
          <RadioButton
            value="DONOR"
            label="Donor"
          />
          <RadioButton
            value="BANK"
            label="Bank"
          />
        </RadioButtonGroup>
        <TextField
          floatingLabelText="Name of company or organization"
          value={this.state.name}
          onChange={this.handleName}
          ref={(nameField) => this.nameField = nameField}
          onKeyDown={this.keyQuery}
          />
        <TextField
          floatingLabelText="Address"
          value={this.state.address}
          onChange={this.handleAddress}
          ref={(addressField) => this.addressField = addressField}
          onKeyDown={this.keyQuery}
          />
        <TextField
          floatingLabelText="City"
          value={this.state.city}
          onChange={this.handleCity}
          ref={(cityField) => this.cityField = cityField}
          onKeyDown={this.keyQuery}
          />
        <TextField
          floatingLabelText="State"
          value={this.state.state}
          onChange={this.handleState}
          ref={(stateField) => this.stateField = stateField}
          onKeyDown={this.keyQuery}
          />
        <TextField
          floatingLabelText="Zip"
          value={this.state.zip}
          onChange={this.handleZip}
          ref={(zipField) => this.zipField = zipField}
          onKeyDown={this.keyQuery}
          />
        <TextField
          floatingLabelText="Email"
          value={this.state.email}
          onChange={this.handleEmail}
          ref={(emailField) => this.emailField = emailField}
          onKeyDown={this.keyQuery}
          />
        <TextField
          floatingLabelText="Password"
          value={this.state.password}
          onChange={this.handlePassword}
          ref={(passwordField) => this.passwordField = passwordField}
          onKeyDown={this.keyQuery}
          onFocus={this.obscure}
          />
        <TextField
          floatingLabelText="Confirm Password"
          value={this.state.confirm}
          onChange={this.handleConfirm}
          ref={(confirmField) => this.confirmField = confirmField}
          onKeyDown={this.keyQuery}
          onFocus={this.obscure}
          />
        <RaisedButton label="Submit" onClick={this.handleSubmit} />
      </div>
    );
  }
}
