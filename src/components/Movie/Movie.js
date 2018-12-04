import React, { Component } from 'react';
import { API_URL, API_KEY } from '../../config';
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
import MoviesToAdd from './MoviesToAdd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import * as actionTypes from '../../store/actions';
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
    MovieId: null

  }
  //this.addMovieId = this.addMovieId.bind(this);
  // var movie_id = this.props.match.params.movieId;



  componentDidMount(){
    this.setState({ loading: true })
    //First fetch the movie ... //match.params basically matchs the movie id variable in the app.js
    const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
    this.fetchItems(endpoint);
  }
 //  handleAddCart(e){
 //    addCart.push(movie_id);
 // }

  fetchItems = (endpoint) => {
    fetch(endpoint)
    .then(result => result.json())
    .then(result => {
      console.log(result);
      console.log(result.id);
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

            this.setState({
              actors: result.cast,
              directors,
              loading: false,
              MovieId: result.id
            })
            console.log("MovieId for the cart: ", this.state.MovieId)
            console.log("this movie title is: ", this.state.movie.title)
          })
        })
      }
    })
    .catch(error => console.error('Error', error))
  }

  addMovieId = (id,title) => {
    // let moviecart = {...this.state.MovieCart};
    // console.log("this moviecart: ", moviecart);
    this.setState({
     MovieCart: {
          ...this.state.MovieCart,
          id: id,
          name: title.original_title
        }
    })
    console.log("Movie Cart: ", this.state.MovieCart);
    // this.state.MovieCart.map((movie) => {
    //   this.setState({
    //       ...this.state.MovieCart,
    //      id: movie.id,
    //      title: title.original_title
    //    })
    // })

    // this.setState({...this.state.MovieCart, id: id, name: title.original_title});
    //   this.setState(prevState => ({
    //     moviecart: {
    //       ...prevState.moviecart,
    //       id: id,
    //       name: title.original_title
    //     }
    // }))
    // this.setState({MovieCart: id, MovieCart: title.original_title})
    // this.state.MovieCart.map((id,title) => {
    //   this.setState({
    //     id: id,
    //     title: title.orginal_title
    //   })
    // })
    console.log(id);
    console.log(title.original_title);

    // return <MoviesToAdd id={id} title={title.original_title} />

    // const id = this.state.MovieId;
    // const name = this.state.movie.title;
    // console.log("const id: ", id);
    // console.log("const name: ", name);

    // this.state.MovieCart[0][] = id
    // this.state.MovieCart["name"] = name
    // {this.state.MovieId.map((movie)  => <MoviesToAdd id={movie} title={movie.name})}
    // {this.state.MovieCart.map((movie)  =>
    //   this.setState({console.log("MOVIE ID: "+ movie.id+ "MOVIE NAME: " + movie.name)})})}
    // {this.state.MovieCart.map((movie)  =>
    //   this.setState({
    //       id: this.state.MovieId,
    //       name: movie.name
    //     })
    // )}

    // this.setState(MovieCart => )
    // console.log(this.state.MovieCart);

    // MovieCart.id.push(id);
    // MovieCart.name.push(name);
    // const add = this.state.add;
    // this.setState({add: !add})
    // this.setState({MovieCart.push(id), MovieCart.name: name }))

    console.log("I came in here");
  }

  render(){
    return(


      <div className="rmdb-movie">
        <Bar />
        {/*If there is a movie render out the navigation, movieinfo, and movieinfobar else return null*/}
        {this.state.movie ?
          <div>
            <MovieInfo movie={this.state.movie} directors={this.state.directors} cart={this.state.addCart} addId = {this.state.MovieId} />
          
          </div>
          : null}
          <div>


                   <button
                      className="WishlistBtn"
                      onClick={() => this.props.onAddWishId(this.state.MovieId, this.state.movie.title)}>
                      <span>
                       <FontAwesomeIcon icon="star" size="2x" />
                      </span>
                      Add to Wish List
                   </button>


                    <button
                      className="CartBtn"
                      onClick={() => this.props.onAddMovieId(this.state.MovieId, this.state.movie.title)}>
                      <span>
                       <FontAwesomeIcon icon="cart-plus" size="2x" />
                      </span>
                      Add to Cart
                    </button>

               {this.props.cart.map((movie) => (
                 <React.Fragment>
                     <li> Cart List User Id: {movie.userId} | Movie Id: {movie.movieId} | Movie Title: {movie.title}</li>
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
            </div>
          {/* {this.state.add ? <MoviesToAdd id={this.state.MovieId} name={this.state.movie.title} /> : null} */}

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
         {this.state.actors && !this.state.loading ? <h1>No Movie Found!</h1>: null}
         {this.state.loading ? <Spinner /> : null}
      </div>
   )
 }
}

const mapStateToProps = state => {
  return{
    cart: state.MovieCart,
    wish: state.WishList
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAddMovieId: (id, title) => dispatch({type: actionTypes.ADD_MOVIE_ID, cartData:{id: id, title: title}}),
    onAddWishId: (id, title) => dispatch({type: actionTypes.ADD_WISH_LIST_ID, wishData:{id: id, title: title}})
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Movie);
