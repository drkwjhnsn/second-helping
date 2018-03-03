import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, FlatButton, Dialog } from 'material-ui';
import Login from './pages/login/index.jsx';
import Landing from './pages/landing/index.jsx';
import Donor from './pages/Donor/index.jsx';
import Bank from './pages/Bank/index.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loginDialog: false
    }

    this.signin = this.signin.bind(this);
    this.signup = this.signup.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    if (document.cookie.indexOf('autologin=true') !== -1) {
      this.autologin();
    }
  }

  autologin() {
    axios.get('/auth/autologin')
    .then(({ data }) => {
      this.setState({ user: data });
    })
  }

  signin(email, password) {
    axios.post('/auth/signin', { email, password })
    .then(({ data }) => {
      this.setState({ user: data });
      this.handleClose();
    });
  }

  signup(type, name, address, city, state, zip, email, password) {

    confirmAddress({ address, city, state, zip })
    .then(({ data }) => {
      if (!data.results[0]) return console.log('Address not confirmed!');
      var location = data.results[0].geometry.location;
      var { lat, lng } = location;
      axios.post('/auth/signup', { type, name, address, city, state, zip, email, password, lat, lng })
      .then(({ data }) => {
        this.setState({ user: data });
        this.handleClose();
      });
    });

  }

  logout() {
    this.setState({ user: null });
    document.cookie = 'autologin=false;';
  }

  handleOpen() {
    this.setState({loginDialog: true});
    setTimeout(() => {
      document.getElementsByClassName("test")[0].style.transform = "translate(0, 5vh)";
    }, 0)
  };

  handleClose() {
    document.getElementsByClassName("test")[0].style.transform = "translate(0, -5vh)";
    this.setState({loginDialog: false});
  };

  render() {
    var user = this.state.user;
    var view;
    var rightIcon;
    if (!user) {
      view = (<Landing />);
      rightIcon = (<FlatButton label="Login" onClick={this.handleOpen}/>);
    } else if (user.type === 'DONOR') {
      view = (<Donor user={user} />);
      rightIcon = (<FlatButton label="Logout" onClick={this.logout}/>);
    } else if (user.type === 'BANK') {
      view = (<Bank user={user} />);
      rightIcon = (<FlatButton label="Logout" onClick={this.logout}/>);
    }
    return (
      <MuiThemeProvider>
        <div className="container">
          <AppBar
            title="Second Helping"
            iconElementRight={rightIcon}
            showMenuIconButton={false}/>
            <Dialog
              open={this.state.loginDialog}
              onRequestClose={this.handleClose}
              contentStyle={{ minWidth: '300px', transform: 'none'}}
              contentClassName="test"
              bodyClassName="dialog-body">
              {
                this.state.loginDialog
                ? (<Login signin={this.signin} signup={this.signup} />)
                : ''
              }
            </Dialog>
          { view }
        </div>
      </MuiThemeProvider>
    );
  }
};

function confirmAddress({ address, city, state, zip }) {
  var addressUrl = naturalToUrl(address);
  var cityUrl = naturalToUrl(city);
  var publicKey = 'AIzaSyD3aVRXSyFga516kCx1dhBpwOWr5WYNQ9Y';
  var fullAddressUrl = `${addressUrl},+${cityUrl},+${state}+${zip}`;
  var queryUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddressUrl}&key=${publicKey}`
  return axios.get(queryUrl)
}

function naturalToUrl(naturalString) {
  return naturalString.split(' ').join('+');
}
