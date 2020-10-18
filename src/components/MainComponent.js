import React, { Component } from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import Menu from './MenuComponent'
import { DISHES } from '../shared/dishes'
import { COMMENTS } from '../shared/comments'
import DishDetail from './DishDetailComponent'

class Main extends Component {

  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      selectedDish: null
    };
  }

  onDishSelect(dishId) {
    this.setState({selectedDish: dishId})
  }

  render(){
    return (
      <div className="App">
        <Navbar dark color='primary '>
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes = {this.state.dishes} comments={this.state.comments} onClick={(dishId) => this.onDishSelect(dishId)}/>
        <DishDetail
            comments={this.state.comments} 
            dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish )[0]} />
      </div>
    );
  }
}

export default Main;
