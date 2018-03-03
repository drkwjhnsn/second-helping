import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import axios from 'axios';
import FoodList from './components/FoodList.jsx';
import PickupList from './components/PickupList.jsx';

export default class Donor extends Component {
  constructor(props) {
    super(props);  //[{ id: 1, food: [] }]
    this.state = {
      pickups: null,
      edit: null,
    };

    this.createPickup = this.createPickup.bind(this);
    this.cancelListing = this.cancelListing.bind(this);
    this.submitPickup = this.submitPickup.bind(this);
  }

  componentWillMount() {
    this.fetchPickups();
  }

  fetchPickups() {
    var user = this.props.user;
    axios.get('/pickup/donor')
    .then(({ data }) => this.setState({ pickups: data }))
  }

  createPickup() {
    this.setState({ edit: {} });
  }

  cancelListing() {
    this.setState({ edit: null });
  }

  submitPickup(foods) {
    var user = this.props.user;
    axios.post('/pickup/donor', { user , foods })
    .then((results) => {
      this.fetchPickups()
      this.setState({ edit: null });
    });
  }

  render () {
    var { pickups, edit } = this.state;
    return (
      <div>
        <div className="donor-container">
          <h1>{this.props.user.name}</h1>
          {
            pickups
            ? <PickupList pickups={pickups} />
            : <h2>No Active Pickups</h2>
          }
          {
            edit
            ? <FoodList {...edit} cancel={this.cancelListing} submit={this.submitPickup}/>
            : <RaisedButton label="New Pickup" onClick={this.createPickup} />
          }
        </div>
      </div>
    )
  }
}

// initialize edit with an empty object
//
