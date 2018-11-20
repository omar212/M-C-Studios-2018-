import React from 'react';
import './MovieThumb.css';
import { Link } from 'react-router-dom';

const MovieThumb = (props) => {

  // const Clicked = () => {
  //   return(
  //     this.setState()
  //   )
  // }
  return(
    <div className="rmdb-moviethumb">
      {console.log("is it clickable", props.clickable)}
      {props.clickable ?
      <Link to={{ pathname: `/${props.movieId}`, movieName: `${props.movieName}`}}> {/*sending the movie id with the link*/}
        <img src={props.image} alt="moviethumb" /> {/*this shows the link */}
      </Link>
      :
      <img src={props.image} alt="moviethumb"/>
      }
    </div>
  )
}

export default MovieThumb
