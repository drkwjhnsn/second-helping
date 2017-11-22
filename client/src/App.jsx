import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Landing from './pages/landing/index.jsx';
import Donor from './pages/Donor/index.jsx';
import Bank from './pages/Bank/index.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      VIEW_DUMMY: 'DONOR'
    }
  }

  componentWillMount() { //actual validation is not yet implement on the back end
    var token =  1 //window.localStorage.getItem('authorization');
    if (token) {
      setToken(token);
      this.validate()
    }
  }

  setToken(token) {
    window.localStorage.setItem('authorization', token);
    axios.defaults.headers.common['authorization'] = token;
  }

  render() {
    return (
      <MuiThemeProvider>

      </MuiThemeProvider>
    );
  }
};
