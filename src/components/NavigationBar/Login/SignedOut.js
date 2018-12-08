import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOut = () => {
  return (
    <ul className="right">
      <li><NavLink to='/SignUp'>Sign Up</NavLink></li>
      <li><NavLink to='/SignIn'>Log In</NavLink></li>
    </ul>
  )
}

export default SignedOut;
