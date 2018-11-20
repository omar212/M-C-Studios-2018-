import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className = "rmdb-header">
      <div className = "rmdb-header-content">
        <img className = "rmdb-logo" src = "./images/MCStudios.png"
          alt = "rmdb-logo" />
         <img className= "rmdb-tmdb-logo" src = "./images/tmdb_logo.png"
         alt = "imdb-logo" />
      </div>
    </div>

  )
}

export default Header
