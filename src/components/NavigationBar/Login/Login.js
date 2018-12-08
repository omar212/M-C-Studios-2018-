import React from 'react';
import { Link } from 'react-router-dom';
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';
import { connect } from 'react-redux';

const Login = (props) => {

  const { auth } = props
  console.log(auth)
  return (
    <nav className="nav-wrapper black darken-3">
      <div className="container">
        <Link to='/' className="brand-logo">M-C Studios</Link>
        <SignedIn />
        <SignedOut />
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Login);
