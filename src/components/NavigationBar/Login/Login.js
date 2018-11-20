import React, { Component } from 'react';
import Bar from '../../elements/Bar/Bar';
import firebase from "firebase";
import fire from '../../../configFire/fire';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Home from '../../Home/Home'


class Login extends Component {

    state = { isSignedIn: false }
    uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => false
      }
    }

    componentDidMount = () => {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({ isSignedIn: !!user })
        console.log("user", user)
      })
    }

    render() {
      return (
        <div>

          {this.state.isSignedIn ? (
            <span>
              <button style= {{ backgroundColor:'black', color: 'white', float: 'right'}} onClick={() => firebase.auth().signOut()}>Sign out!</button>
              <h1 style={{textAlign: 'center',height: '100px', backgroundColor:'black', color: 'white'}}>Welcome {firebase.auth().currentUser.displayName}</h1>
              <Home />
            </span>
          ) :
            (
            <div>
              <div>
                <Bar />
                <h1 style={{textAlign: 'center'}}>Welcome to M&C Studios Sign Up Page </h1>
              </div>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
              style={{position:'center'}}
            />
          </div>
          )}
        </div>
      )
    }
}

export default Login;
