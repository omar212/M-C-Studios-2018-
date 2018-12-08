import React, { Component } from 'react';
import Header from '../elements/Header/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';
import NotFound from '../elements/NotFound/NotFound';
import Movie from '../Movie/Movie';
import Login from '../NavigationBar/Login/Login';
import reduxCart from '../NavigationBar/Cart/ReduxCart';
import WishList from '../NavigationBar/WishList/WishList';
// import { createStore, applyMiddleware, } from 'redux';
// import rootReducer from '../../store/reducers/rootReducer';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import { getFirebase } from 'react-redux-firebase';

//const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({getFirebase})));

class App extends Component {
  render() {
    return (
    //<Provider store={store}>
      <BrowserRouter>
        <React.Fragment> {/* instead of using many divs */}
          <Login/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/SignIn" component={SignIn} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path = "/Login" component={Login} />
            <Route exact path = "/WishList" component={WishList} />
            <Route exact path = "/Cart" component={reduxCart} />
            <Route exact path= "/:movieId" component={Movie} />
            <Route component={NotFound} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    //</Provider>
    );
  }
}

export default App;
