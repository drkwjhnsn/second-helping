import React, { Component } from 'react';
import { RaisedButton, TextField, Tabs, Tab } from 'material-ui';
import Paper from 'material-ui/paper';
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeView: 'SIGNIN'
    }

    this.changeTab = this.changeTab.bind(this);
  }

  componentDidMount() {
    // document.getElementsByClassName("test")[0].style.transform = "translate(0, 10vh)";
  }

  changeTab(activeView) {
    this.setState({ activeView });
  }

  render() {
    var activeView = this.state.activeView;
    var { signin, signup } = this.props;
    return (
      <div>
        <Tabs value={this.state.currentTab} onChange={this.changeTab} contentContainerClassName="tab-container">
          <Tab label="Sign-in" value="SIGNIN">
            { activeView === 'SIGNIN' ? <Signin signin={signin} /> : '' }
          </Tab>
          <Tab label="Sign-up" value="SIGNUP">
            { activeView === 'SIGNUP' ? <Signup signup={signup} /> : '' }
          </Tab>
        </Tabs>
      </div>
    );
  }
};
