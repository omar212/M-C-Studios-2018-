import React from 'react';
import './MovieThumb.css';

const MovieThumb = (props) => {

  // const Clicked = () => {
  //   return(
  //     this.setState()
  //   )
  // }
  return(
    <div className="rmdb-moviethumb">
      <img src={props.image} alt="moviethumb" onClick={props.clickable}/>
    </div>
  )
}

export default MovieThumb
