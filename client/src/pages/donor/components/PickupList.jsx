import React, { Component } from 'react';
import PickupFoodList from './PickupFoodList.jsx';
import Paper from 'material-ui/paper';


module.exports = (props) => (
    <Paper>
      { props.pickups.map((pickup) => <PickupFoodList {...pickup} />)}
    </Paper>
  )
