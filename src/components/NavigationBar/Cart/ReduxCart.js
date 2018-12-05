import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bar from '../../elements/Bar/Bar';
import * as actionTypes from '../../../store/actions';
import LazyLoad from 'react-lazyload';
// import '../Home/Home.css';
import MovieThumb from '../../elements/MovieThumb/MovieThumb';
// import FourColGrid from '../elements/FourColGrid/FourColGrid';
import { API_KEY, API_URL, IMAGE_BASE_URL, POSTER_SIZE } from '../../../config.js';


class reduxCart extends Component {
  constructor(){
    super();
    this.state = {
      text: 'Shopping Cart',
      loaded: false
    }
  }

  componentDidMount(){
    const img = new Image();
    img.src = this.props.movie_img;
    console.log("img.src: ", img.src);
    console.log("i did load");
  }

// className="rmdb-home-grid"
  render(){
    return (
       <div>
         <Bar />
        {this.props.addMovies.map((movie) => (
              <li>User Id: {movie.userId} | Movie Id: {movie.movieId} | Movie Title: {movie.title} | Movie Image: {movie.image}</li>
        ))}
          {/* <img
             src = {`${IMAGE_BASE_URL}${POSTER_SIZE}${this.props.addMovies.image}`}
             onLoad={this.props.showId()}
           />*/}
           <button onClick = {this.showId} />
             {this.props.movie_img.map((movie) => (
               <LazyLoad height={200}>
                     <img src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie}`}
                          onload={this.showId}
                          />
              </LazyLoad>
             ))}

             {console.log(`${IMAGE_BASE_URL}${POSTER_SIZE}/${this.props.movie_img}`)}
            {/*<img src = {require("https://image.tmdb.org/t/p/w500/${this.props.addMovies.image}")} alt = "added movie"/>*/}


             {console.log("redux cART SAYS THIS: ",this.props.movie_img)}

      </div>
    );
  }
}
/* <MovieThumb
//       key={i}
//       image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : null }
//       movieId={movie.movieId}
//       movieName={movie.title}
//     />*/
// <FourColGrid
//   header={this.state.text}
//   loading={this.state.loading}
//   >
// </FourColGrid>
const mapStateToProps = state => {
  return{
    addMovies: state.MovieCart,
    movie_img: state.MovieImageCart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onShowId: () => dispatch({type: actionTypes.SHOW_CART})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxCart);
