import React from 'react';

var parseDate = (date) => date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear();

export default (props) => (
  <div className="FoodItem">
    <p>{props.description}</p>
    <p>{props.quantity}</p>
  </div>
);

// <p>{'exp: ' + parseDate(props.expiry)}</p>
