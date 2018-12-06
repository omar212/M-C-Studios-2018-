import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bar from '../../elements/Bar/Bar';
import './WishList.css';
import LazyLoad from 'react-lazyload';
import * as actionTypes from '../../../store/actions';
import WishListCard from './WishListCard';
import { API_KEY, API_URL, IMAGE_BASE_URL, POSTER_SIZE, CART_IMAGE_SIZE } from '../../../config.js';
// import '../Home/Home.css';
// import MovieThumb from '../elements/MovieThumb/MovieThumb.css';
// import FourColGrid from '../elements/FourColGrid/FourColGrid';



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
       <React.Fragment className="WishListbody">
           <React.Fragment> <Bar /> </React.Fragment>

           {this.props.addMovies.map((movie) => (
              <li>User Id: {movie.userId} | Movie Id: {movie.movieId} | Movie Title: {movie.title}</li>
            ))}

              <div>
              {this.props.movie_img.map((movie) => (
                  <WishListCard
                    imageWish={`${IMAGE_BASE_URL}${CART_IMAGE_SIZE}${movie}`}
                    title={this.props.addMovies.title}
                    onload={this.showId}
                    />
              ))}
              </div>

            {/* <div className="picture-grid">
            // {this.props.movie_img.map((movie) => (
            //   <LazyLoad >
            //         <img src={`${IMAGE_BASE_URL}${CART_IMAGE_SIZE}${movie}`}
            //              onload={this.showId}
            //              className="grid-box"
            //              />
            //  </LazyLoad>
            // ))}
            // </div>*/}

            {console.log("this is from the wishlist page: ", `${IMAGE_BASE_URL}${CART_IMAGE_SIZE}${this.props.movie_img}`)}

      </React.Fragment>
    );
  }
}



const mapStateToProps = state => {
  return{
    addMovies: state.WishList,
    movie_img: state.MovieImageWish
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showId: () => dispatch({type: actionTypes.SHOW_WISH_LIST})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxCart);
