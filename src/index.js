import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import firebase from "firebase";
import { createStore } from 'redux';
import reducer from './store/reducers';
import { Provider } from 'react-redux';

//Provier is a helper comoponent which allows us to inject
//our into the react component

const store = createStore(reducer);

console.log("check the state from redux: ",store.getState());
firebase.auth().onAuthStateChanged(user => {
  if(user) {
    console.log('user has signed in or up', user);
  } else {
    console.log('user has signed');
  }
})

console.log("firebase: ", firebase);

console.log("check the state from redux: ",store.getState());


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
