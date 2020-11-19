import React, { Component } from 'react';
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Contact from './ContactComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())}
});

class Main extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchDishes();
  }

  render(){

    const HomePage = () => {
      return(
          <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}  
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMessage={this.props.dishes.errMessage}
            promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
            leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }

    const DishwithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMessage={this.props.dishes.errMessage}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          addComment={this.props.addComment}
        />
        );
    }

    return (
      <div className="App">
        <Header />
        <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
            <Route path="/menu/:dishId" component={DishwithId} />
            <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
            <Route exact path="/contactus" component={Contact} />
            <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
