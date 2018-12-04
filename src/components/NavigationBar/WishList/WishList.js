import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bar from '../../elements/Bar/Bar';

import * as actionTypes from '../../../store/actions';
// import '../Home/Home.css';
// import MovieThumb from '../elements/MovieThumb/MovieThumb.css';
// import FourColGrid from '../elements/FourColGrid/FourColGrid';
// import { API_KEY, API_URL, IMAGE_BASE_URL, POSTER_SIZE } from '../../config.js';


class reduxCart extends Component {
  state = {
    text: 'Wish List Page'
  }

  componentDidMount(){
    console.log("i did load");
  }
 // className="rmdb-home-grid"
  render(){
    return(
       <React.Fragment onLoad={this.showId}>
           <React.Fragment> <Bar /> </React.Fragment>

           {this.props.addMovies.map((movie) => (
              <li>User Id: {movie.userId} | Movie Id: {movie.movieId} | Movie Title: {movie.title}</li>

            ))}
      </React.Fragment>
    );
  }
}



const mapStateToProps = state => {
  return{
    addMovies: state.WishList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showId: () => dispatch({type: actionTypes.SHOW_WISH_LIST})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxCart);
