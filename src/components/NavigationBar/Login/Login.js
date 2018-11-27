import React, { Component } from 'react';
import Bar from '../../elements/Bar/Bar';
import firebase from "firebase";
import fire from '../../../configFire/fire';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Home from '../../Home/Home';

const loginStyles = {
  width: "90%",
  maxWidth: "200px",
  margin: "20px auto",
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px"
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
  }

  state = {
    isSignedIn: false,
    redirect: false
  }

  authWithEmailPassword(event) {
    event.preventDefault()
    console.table([{
      email: this.emailInput.value,
      password: this.passwordInput.value
    }])
  }

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
    if(this.state.redirect) {
      {/* Redirect to home page */}
    }
    return (
      <div>
        {this.state.isSignedIn ? (
          <span>
            <button style= {{ backgroundColor:'black', color: 'white', float: 'right'}} onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1 style={{textAlign: 'center',height: '100px', backgroundColor:'black', color: 'white'}}>Welcome {firebase.auth().currentUser.displayName}</h1>
          </span>
        ) :
          (
          <div>
            <div>
              <h1 style={{textAlign: 'center'}}>Welcome to M&C Studios Sign Up Page </h1>
            </div>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
              style={{position:'center'}}/>
            <div style={loginStyles}>
              <form onSubmit={(event) => {this.authWithEmailPassword(event)}} ref={(form) => {this.loginForm = form}}>
                <label className="#">
                  Email
                  <input
                    style={{width: "100%"}}
                    className="#"
                    name="email"
                    type="email"
                    ref={(input) => {this.emailInput = input}}
                    placeholder="E-mail">
                  </input>
                </label>
                <label className="#">
                  Password
                  <input
                    style={{width: "100%"}}
                    className="#"
                    name="password"
                    type="password"
                    ref={(input) => {this.passwordInput = input}}
                    placeholder="Password">
                  </input>
                </label>
                <input style={{width: "100%", marginTop: "5px"}} type="submit" className="#" value="Log In"></input>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Login;
