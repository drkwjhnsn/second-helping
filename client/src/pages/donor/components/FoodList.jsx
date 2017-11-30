import React, { Component } from 'react';
import FoodItem from './FoodItem.jsx';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentDelete from 'material-ui/svg-icons/content/remove';
import ContentSubmit from 'material-ui/svg-icons/content/send';
import ContentCancel from 'material-ui/svg-icons/content/clear';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/paper';

export default class FoodList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: [{}]
    }
    this.addFood = this.addFood.bind(this);
    this.deleteFood = this.deleteFood.bind(this);
    this.submitFoods = this.submitFoods.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
  }

  handleItemChange(no, field, e) {
    var prevFoods = this.state.foods;
    var newFoods = [...prevFoods];
    var value = e.target.value;
    newFoods[no][field] = value;
    this.setState({ foods: newFoods });
  }

  addFood() {
    var prevFoods = this.state.foods;
    var newFoods = [...prevFoods, {}];
    this.setState({ foods: newFoods });
  }

  deleteFood() {
    var prevFoods = this.state.foods;
    var newFoods = prevFoods.slice(0, prevFoods.length - 1 || 1);
    this.setState({ foods: newFoods });
  }

  submitFoods() {
    this.props.submit(this.state.foods);
  }

  render() {
    var { foods } = this.state;
    return (
      <div className="FoodList-container">
        { foods.map((food, idx) => <FoodItem {...food} key={idx} no={idx} handleItemChange={this.handleItemChange}/>) }
        <div className="FoodList-button-cluster">
          <FloatingActionButton onClick={this.deleteFood}>
            <ContentDelete />
          </FloatingActionButton >
          <FloatingActionButton onClick={this.props.cancel}>
            <ContentCancel />
          </FloatingActionButton >
          <FloatingActionButton onClick={this.submitFoods}>
            <ContentSubmit />
          </FloatingActionButton >
          <FloatingActionButton onClick={this.addFood}>
            <ContentAdd />
          </FloatingActionButton >
        </div>
      </div>
    )
  }
}
