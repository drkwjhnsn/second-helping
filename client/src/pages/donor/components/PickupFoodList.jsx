import React, { Component } from 'react';
import PickupFoodItem from './PickupFoodItem.jsx';
import Paper from 'material-ui/paper';


module.exports = (props) => {
  var { foods } = props;
  return (
    <Paper>
      <table className="PickupFoodList-container">
        { props.foods.map((food) => (<PickupFoodItem { ...food } />))}
      </table>
    </Paper>
  )
};
