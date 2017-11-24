import React, { Component } from 'react';
import { RaisedButton, TextField } from 'material-ui';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm: '',
    }
    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.obscure = this.obscure.bind(this);
    this.keyQuery = this.keyQuery.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmail(e) {
    var email = e.target.value;
    this.setState({ email });
  }

  handlePassword(e) {
    var password = e.target.value;
    this.setState({ password });
  }

  handleConfirm(e) {
    var confirm = e.target.value;
    this.setState({ confirm });
  }

  obscure(e) {
    e.target.setAttribute('type', 'password');
  }

  clearFields() {
    this.setState({ email: '', password: '', confirm: '' });
    this.emailField.value = '';
    this.passwordField.value = '';
    this.confirmField.value = '';
  }

  keyQuery(e) {
    if (e.keyCode === 13) this.handleSubmit();
  }

  handleSubmit() {
    var { email, password } = this.state;
    this.props.signup(email, password);
    this.clearFields();
  }

  render() {
    return (
      <div className="signup">
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
