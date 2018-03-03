import React, { Component } from 'react';
import PickupFoodItem from './PickupFoodItem.jsx';
import Paper from 'material-ui/paper';


module.exports = (props) => {
  var { foods } = props;
  return (
    <Paper className="PickupFoodList-container">
      { props.foods.map((food, idx) => (<PickupFoodItem { ...food } key={idx} />))}
    </Paper>
  )
};
