import React, { Component } from 'react';
import Bar from '../../elements/Bar/Bar';
import firebase from "firebase";
import fire from '../../../configFire/fire';
import { Link } from 'react-router-dom';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Home from '../../Home/Home';
import * as actionTypes from '../../../store/actions';
import { connect } from 'react-redux';

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
      signInSuccessWithAuthResult: () => false
    }
  }


  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
      var database = firebase.database();
      var Usersref = database.ref('User/User');
      var email = Usersref.child('email');
      var name = Usersref.child('name');

      const newUser = {
        name: user.displayName,
        email: user.email
      }

      email.set(newUser.email);
      name.set(newUser.name);
      //
      // var usersRef = ref.child("User");
      //
      //
      // ref.once("value", function(data) {
      //   console.log("data.val().email: ", data.val().email);
      //   // console.log("entered email: ", user.email);
      //   // if(data.val().email === user.email){
      //   //   console.log("already exists");
      //   // }else{
      //
      //     usersRef.push(newUser);
      //   }
      // );
      // console.log("usersRef: ", newUser.email);



      // usersRef.update({
      //    name: snapshot.val(),
      //    email: snapshot.val()
      // });
      // ref.child(userId).once('value', function(snapshot) {
      //   exists = (snapshot.val() !== null);
      // });
      // if (exists) {
      //   alert('user ' + userId + ' exists!');
      // } else {
      //
      //   alert('user ' + userId + ' does not exist!');
      // }

      // ref.on("value", function(snapshot) {
      //   // if(data.user.filter(result => result !== snapshot.val().email)){
      //   //
      //   // }
      // }, function (errorObject) {
      //   console.log("The read failed: " + errorObject.code);
      // });
      // this.props.onAddEmail(data.user);
      // if(~data.user.indexOf(user.email)){
      //   console.log("correct");
      //   user.isAdmin = true
      // }
      //
      // accounts.child(user.uid).update(user)
      // .then(function () {
      //   console.log("came in here");
      //   return data.user.remove();
      // })

    })
  }

  render() {

    if(this.state.redirect) {
      {/* Redirect to home page */}
    }
    return (
      <div>
        {this.state.isSignedIn ? (
            <div style={{backgroundColor:'black'}}>
              <button style= {{ marginBottom: '25%', borderRadius: '25px', fontSize: '20px' , backgroundColor:'black', color: 'white', float: 'right'}} onClick={() => firebase.auth().signOut()}>Sign out!</button>
              <h1 style={{margin:'0 0 auto',textAlign: 'center',height: '100px', backgroundColor:'black', color: 'white'}}>Welcome {firebase.auth().currentUser.displayName}</h1>
              <Home />
            </div>


        ) :
          (
            <div>
              <h1 style={{textAlign: 'center'}}>Welcome to M&C Studios Sign Up Page </h1>
          
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
                style={{position:'center'}}/>
            </div>
        )}
      </div>
    )
  }
}


const mapStateToProps = state => {
  return{
    userEmail: state.User
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddEmail: (email) => dispatch({type: actionTypes.ADD_EMAIL, email: email}),
  };
};

export default Login;
