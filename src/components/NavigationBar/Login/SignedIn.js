import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../store/actions/authAction';

const SignedIn = (props) => {
  return (
    <ul className="right">
      <li><NavLink to='/Cart'>Cart</NavLink></li>
      <li><NavLink to='/WishList'>Wish List</NavLink></li>
      <li><a onClick={props.signOut}>Log Out</a></li>
      <li><NavLink to='/' className="btn btn-floating blue lighten-1">YL</NavLink></li>
    </ul>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null,mapDispatchToProps)(SignedIn);
