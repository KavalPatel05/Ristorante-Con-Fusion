import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContantComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutusComponent';
import { Switch , Route ,Redirect } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  // onDishSelect(dishId) {
  //   this.setState({ selectedDish: dishId});
  // }

  render() {

    const HomePage = () => {
      return(
        <Home dish={this.state.dishes.filter((dish)=> dish.featured)[0]}
        promotion={this.state.promotions.filter((promo)=> promo.featured)[0]}
        leader={this.state.leaders.filter((leader)=> leader.featured)[0]}
        />
      );
    }

    const Aboutus =()=>{
      return(
        <About leaders={this.state.leaders}/>
      );
    }


    const DishWithId = ({match}) =>{
        return(
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params["dishID"]))[0]}
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params["dishID"]))} />
        );

    }
    
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path='/menu' component={()=> <Menu dishes={this.state.dishes}/>} />
          <Route exact path='/contactus' component={Contact}/>
          <Route path='/menu/:dishID' component={DishWithId}/>
          <Route exact path="/aboutus" component={Aboutus}/>
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;