import React, { Component } from 'react';
import Header from '../elements/Header/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import NotFound from '../elements/NotFound/NotFound';
import Movie from '../Movie/Movie';
import Login from '../NavigationBar/Login/Login';
import Cart from '../NavigationBar/Cart/Cart';
import WishList from '../NavigationBar/WishList/WishList';
// import Bar from '../elements/Bar/Bar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment> {/* instead of using many divs */}
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path = "/Login" component={Login} />
            <Route exact path = "/WishList" component={WishList} />
            <Route exact path = "/Cart" component={Cart} />
            <Route exact path= "/:movieId" component={Movie} />
            <Route component={NotFound} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
