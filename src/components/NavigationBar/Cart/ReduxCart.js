import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bar from '../../elements/Bar/Bar';
import {Id, Name} from '../../Movie/MoviesToAdd';
import * as actionTypes from '../../../store/actions';
// import '../Home/Home.css';
// import MovieThumb from '../elements/MovieThumb/MovieThumb.css';
// import FourColGrid from '../elements/FourColGrid/FourColGrid';
// import { API_KEY, API_URL, IMAGE_BASE_URL, POSTER_SIZE } from '../../config.js';


class reduxCart extends Component {
  state = {
    text: 'Shopping Cart'
  }

  componentDidMount(){
    console.log("i did load");
  }
// className="rmdb-home-grid"
  render(){
    return(

       <div  onLoad={this.showId}>
         <Bar />
        {this.props.addMovies.map((movie) => (
              <li>User Id: {movie.userId} | Movie Id: {movie.movieId} | Movie Title: {movie.title}</li>
        ))}
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
    addMovies: state.MovieCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showId: () => dispatch({type: actionTypes.SHOW_CART})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxCart);
