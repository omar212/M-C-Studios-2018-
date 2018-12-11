import React from 'react';
import { Link } from 'react-router-dom';
import SignedIn from '../../NavigationBar/Login/SignedIn';
import SignedOut from '../../NavigationBar/Login/SignedOut';
import { connect } from 'react-redux';


const Bar = (props) => {
    const { auth } = props
    console.log(auth)
    const links =  auth.uid ? <SignedIn /> : <SignedOut />
    return(
      <nav className="nav-wrapper black darken-3">
        <div className="container">
          <Link to='/' className="brand-logo">M-C Studios</Link>
          { links }
        </div>
      </nav>
    );

}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Bar);
