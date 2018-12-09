import React, { Component } from 'react';
import { API_URL, API_KEY, MOVIE_TRAILER, YOUTUBE, APPEND_TRAILER } from '../../config';
import Navigation from '../elements/Navigation/Navigation';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import Actor from '../elements/Actor/Actor';
import Spinner from '../elements/Spinner/Spinner';
import Bar from '../elements/Bar/Bar';
import reduxCart from '../NavigationBar/Cart/ReduxCart';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import * as actionTypes from '../../store/actions';
import firebase from "firebase";
import { TwitterShareButton } from 'react-share';
import { TwitterIcon } from 'react-share';

import './Movie.css';

library.add(faCartPlus, faStar);

class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false,
    wishList: [],
    add: false,
    MovieCart: [
      {
        id: null,
        name: ''
      }
    ],
    MovieId: null,
    MovieImage: null,
    cost: 4.99,
    youtubeKey: null
  }

  componentDidMount(){
    this.setState({ loading: true })
    //First fetch the movie ... //match.params basically matchs the movie id variable in the app.js
    const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
    const trailer_endpoint = `${MOVIE_TRAILER}${this.props.match.params.movieId}?api_key=${API_KEY}${APPEND_TRAILER}`
    this.fetchItems(endpoint);
    this.fetchTrailerItems(trailer_endpoint);

  }

  fetchItems = (endpoint) => {
    fetch(endpoint)
    .then(result => result.json())
    .then(result => {
      console.log(result);
      console.log(result.id);
      console.log(result.poster_path);
      //remember setState can also accept call back functions
      if(result.status_code){ //if this exist means there is no movie
        this.setState({ loading: false})
      }else{
        this.setState({ movie: result}, () => {
          const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`;

          fetch(endpoint)
          .then(result => result.json())
          .then(result => { //crew and job our predefined properties from the api and member is just a variable
            const directors = result.crew.filter( (member) => member.job === "Director");
            console.log("Result: ", result);
            this.setState({
              actors: result.cast,
              directors,
              loading: false,
              MovieId: result.id,
              MovieImage: this.state.movie.poster_path,
            })
            // var database = firebase.database();
            // var ref = database.ref('User');
            //
            // var data = {
            //   movieId: this.state.MovieId,
            //   title: this.state.movie.title,
            //   image: this.state.MovieImage
            // }
            //
            // ref.push(data);
            console.log("MovieId for the cart: ", this.state.MovieId)
            console.log("this movie title is: ", this.state.movie.title)
            console.log("this movie image poster path is: ", this.state.MovieImage)
          })
        })
      }
    })
    .catch(error => console.error('Error', error))
  }

  fetchTrailerItems = (fetchTrailerItems) => {
    fetch(fetchTrailerItems)
    .then(result => result.json())
    .then(result => {
      console.log(result);
      //remember setState can also accept call back functions
      if(result.status_code){ //if this exist means there is no movie
        this.setState({ loading: false})
      }else{
        this.setState({ movie: result}, () => {
          const endpoint = `${MOVIE_TRAILER}${this.props.match.params.movieId}?api_key=${API_KEY}${APPEND_TRAILER}`;
          fetch(endpoint)
          .then(result => result.json())
          .then(result => {
            console.log("Result: ", result);
            if(result.videos.results.length === 0){
              this.setState({
                trailer: result.homepage,
                youtubeKey: null
              })
            }else{
              this.setState({
                trailer: result.homepage,
                youtubeKey: result.videos.results[0].key
              })
            }

            console.log("trailer link is: ", this.state.trailer);
            console.log("youtube key is: ", this.state.youtubeKey);
          })
        })
      }
    })
    .catch(error => console.error('Error', error))
  }


  render(){
    return(
      <div className="rmdb-movie">
        <Bar />
        {/*If there is a movie render out the navigation, movieinfo, and movieinfobar else return null*/}
        {this.state.movie ?
          <div>
            <MovieInfo
              movie={this.state.movie}
              directors={this.state.directors}
              cart={this.state.addCart}
              addId = {this.state.MovieId}
              trailer = {this.state.youtubeKey}/>

          </div>
          : null}
          {this.props.cart ?
          (<div>
                <div className="Btns">
                           <FontAwesomeIcon onClick={() => {this.props.onAddWishId(this.state.MovieId, this.state.movie.title, this.state.MovieImage);
                                           this.props.onAddImageWish(this.state.MovieImage)}} icon="star" size="4x" className="WishlistBtn" />

                           <FontAwesomeIcon onClick={() => {this.props.onAddMovieId(this.state.MovieId, this.state.movie.title, this.state.MovieImage);
                                           this.props.onAddImageCart(this.state.MovieImage, this.state.MovieId);
                                           this.props.onAddCost(this.state.MovieId, this.state.cost)}} icon="cart-plus" size="4x"   className="CartBtn" />

                                         {/* <TwitterShareButton  via = "https://moviesandchill.com/" title = "avengers" hashtags = {["#cantwait","#whowantstowatchitwithme"]} round={true} >
                                         // <TwitterIcon urlsize={32} round={true} />
                                         // </TwitterShareButton>*/}
              </div>
               {this.props.cart.map((movie) => (
                 <React.Fragment>
                     <li> Cart List User Id: {movie.userId}
                       | Movie Id: {movie.movieId}
                       | Movie Title: {movie.title}
                       | Movie Image: {movie.image}
                       | Movie Cost: {this.props.total_cost}
                     </li>
                </React.Fragment>
                 ))}

                {this.props.wish.map((movie) => (
                  <React.Fragment>
                    <li> Wish List User Id: {movie.userId} | Movie Id: {movie.movieId} | Movie Title: {movie.title}</li>
                  </React.Fragment>
                ))}
            {this.state.movie ?
              <div>
                <MovieInfoBar time={this.state.movie.runtime} budget={this.state.movie.budget} revenue={this.state.movie.revenue} />
              </div>
              : null}
            </div>): null}


        {/*If there are actors for the movie */}
        {this.state.actors ?
         <div className="rmdb-movie-grid">
           <FourColGrid header={'Actors'}>
             {this.state.actors.map((element, i) => {
               return <Actor key={i} actor={element} />
             })}
           </FourColGrid>
         </div>
         : null}
         {this.state.actors && !this.state.loading ? null : <Spinner /> }

      </div>
   )
 }
}

const mapStateToProps = state => {
  return{
    cart: state.MovieCart,
    wish: state.WishList,
    movie_img_cart: state.MovieImageCart,
    movie_img_wish: state.MovieImageWish,
    total_cost: state.TotalCost
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAddMovieId: (id, title, image) => dispatch({type: actionTypes.ADD_MOVIE_ID, cartData:{id: id, title: title, image: image}}),
    onAddWishId: (id, title, image) => dispatch({type: actionTypes.ADD_WISH_LIST_ID, wishData:{id: id, title: title, image: image}}),
    onAddImageCart: (imageId, movieId) => dispatch({type: actionTypes.ADD_IMAGE_CART, imageId: imageId, movieId: movieId}),
    onAddImageWish: (imageId) => dispatch({type: actionTypes.ADD_IMAGE_WISH, imageId: imageId}),
    onAddCost: (id, cost) => dispatch({type: actionTypes.ADD_COST, id: id, cost: cost})
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Movie);
