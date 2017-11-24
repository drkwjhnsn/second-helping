import React, { Component } from 'react';
import { RaisedButton, TextField } from 'material-ui';

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.keyQuery = this.keyQuery.bind(this);
  }

  handleEmail(e) {
    var email = e.target.value;
    this.setState({ email });
  }

  handlePassword(e) {
    var password = e.target.value;
    this.setState({ password });
  }

  clearFields() {
    this.setState({ email: '', password: '', confirm: '' });
    this.emailField.value = '';
    this.passwordField.value = '';
  }

  keyQuery(e) {
    if (e.keyCode === 13) this.handleSubmit();
  }

  handleSubmit() {
    var { email, password } = this.state;
    this.props.signin(email, password);
    this.clearFields();
  }

  render() {
    return (
      <div className="signin">
        <TextField
          floatingLabelText="Email"
          value={this.state.email}
          onChange={this.handleEmail}
          ref={(emailField) => this.emailField = emailField}
          onKeyDown={this.keyQuery}
          autoFocus={true}/>
        <TextField
          floatingLabelText="Password"
          value={this.state.password}
          type="password"
          onChange={this.handlePassword}
          ref={(passwordField) => this.passwordField = passwordField}
          onKeyDown={this.keyQuery}/>
        <RaisedButton label="Submit" onClick={this.handleSubmit} />
      </div>
    );
  }
}
