import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE, YOUTUBE } from '../../../config';
import MovieThumb from '../MovieThumb/MovieThumb';
import FontAwesome from 'react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './MovieInfo.css';

library.add(faVideo);

const MovieInfo = (props) => {
  return (
    <div className="rmdb-movieinfo"
         style = {{
           background: props.movie.backdrop_path ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${props.movie.backdrop_path}')` : '#0000'
         }}
    >
      <div className="rmdb-movieinfo-content">
          <div className="rmdb-movieinfo-thumb">
              <MovieThumb
                image={props.movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${props.movie.poster_path}`: './images/no_image.jpg'}
                clickable={false}
              />

          </div>
            <div className="rmdb-movieinfo-text">
                  <h1>{props.movie.title}</h1>
                  {props.trailer ?
                  <div className='player-wrapper'>
                     <ReactPlayer
                       controls
                       className='react-player'
                       playing
                       width='100%'
                       height='100%'
                       style={{ float: 'left', opacity:'.9' }}
                       url={`${YOUTUBE}${props.trailer}`}/>
                  </div>  : null }
                  <h3>PLOT</h3>
                  <p>{props.movie.overview}</p>
                  <div className="rmdb-rating">
                      <meter min="0" max="100" optimum="100" low="40" high="70" value={props.movie.vote_average * 10}></meter>
                      <p className="rmdb-score">{props.movie.vote_average}</p>
                  </div>
                  {props.directors.length > 1 ? <h3>DIRECTORS</h3> : <h3>DIRECTOR</h3>}
                  {props.directors.map( (element, i)=> {
                    return <p key ={i} className="rmdb-director">{element.name}</p>
                  })}
                </div>
                <span>
                <div className="genres">
                  {/* <b><h4 style={{color: 'white', paddingRight: '10px', marginTop:'15px'}}>Genre: </h4></b>*/}
                  {props.genre.map( (element, i) => {
                    return <h5 key = {i} style={{paddingRight: '47px'}}>{element}</h5>
                  })}
                </div>
                </span>
                <FontAwesome className="fa-film" name="film" size="5x" />
        </div>
      </div>
  )
}


export default MovieInfo;
