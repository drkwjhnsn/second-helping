import React, { Component } from 'react';
import FoodList from './components/FoodList.jsx';

export default class Donor extends Component {
  render () {
    return (
      <div>
        <div className="donor-container">
          <FoodList />
        </div>
      </div>
    )
  }
}
