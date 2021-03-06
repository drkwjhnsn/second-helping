import React, { Component } from 'react';
import axios from 'axios';
import Paper from 'material-ui/paper';
import PickupFeed from './components/PickupFeed.jsx';
import ClaimList from './components/ClaimList.jsx';

export default class Bank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickups: [],
      claims: [],
      pickupPins: [],
      claimPins: []
    };

    this.acceptClaim = this.acceptClaim.bind(this);
    this.cancelClaim = this.cancelClaim.bind(this);
    this.completeClaim = this.completeClaim.bind(this);
  }

  componentWillMount() {
    this.fetchPickups();
  }

  setClaimPins() {
    var claimPins = [];
    this.state.claims.forEach((claim, idx) => {
      // axios.get(`https://chart.googleapis.com/chart?chst=d_map_pin_letter_withshadowchld=A|FF0000|0000FF`)
      // .then
      claimPins.push(
        new google.maps.Marker({
          position: {lat: claim.donor.lat, lng: claim.donor.lng},
          map: this.map
        })
      )
    });
    this.setState({claimPins});
  }

  setPickupPins() {
    var pickupPins = [];
    console.log(this.state.pickups);
    this.state.pickups.forEach((pickup, idx) => {
      pickupPins.push(
        new google.maps.Marker({
          position: {lat: pickup.donor.lat, lng: pickup.donor.lng},
          map: this.map
        })
      );
    });
    this.setState({pickupPins});
  }

  componentDidMount() {
    var { lat, lng } = this.props.user;
   this.map = new google.maps.Map(document.getElementById('map'),
    {center: { lat, lng }, zoom: 12});
  }

  fetchPickups() {
    return axios.get('/pickup/bank')
    .then(({ data }) => {
      window.pickups = data;
      var pickups = data.filter((pickup) => !pickup.bank_id)
      var claims = data.filter((claim) => claim.bank_id)
      this.setState({ pickups, claims });
      this.setPickupPins();
    });
  }

  acceptClaim(claimId) {
    return axios.post(`/pickup/bank`, { claimId })
    .then(() => {
      this.fetchPickups();
    });
  }

  cancelClaim(claimId) {
    return axios.put(`/pickup/bank`, { claimId })
    .then(() => {
      this.fetchPickups();
    });
  }

  completeClaim(claimId) {
    console.log(claimId);
    return axios.delete(`/pickup/bank?claimId=${claimId}`)
    .then(() => {
      this.fetchPickups();
    });
  }

  render() {
    var { pickups, claims } = this.state;
    return (
      <div className="Bank">
        <h1>{this.props.user.name}</h1>
        <div className="bank-lists">
          <PickupFeed pickups={pickups} accept={this.acceptClaim}/>
          <ClaimList claims={claims} cancelClaim={this.cancelClaim} completeClaim={this.completeClaim}/>
        </div>
        <Paper className="map-container">
          <div id="map"></div>
        </Paper>
      </div>
    );
  }
}
