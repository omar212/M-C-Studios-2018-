import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bar from '../../elements/Bar/Bar';
import * as actionTypes from '../../../store/actions';
import LazyLoad from 'react-lazyload';
import './ReduxCart.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import MovieThumb from '../../elements/MovieThumb/MovieThumb';
import CheckoutButton from './CheckOutBtn';
import firebase from "firebase";
// import FourColGrid from '../elements/FourColGrid/FourColGrid';
import { API_KEY, API_URL, IMAGE_BASE_URL, POSTER_SIZE, CART_IMAGE_SIZE } from '../../../config.js';

library.add(faTrashAlt);

class reduxCart extends Component {
    state = {
      loaded: false,
      id: 0
    }

    errData = (err) => {
      console.log("error");
      console.log(err);
    }

  componentDidMount(){
    var database = firebase.database();
    var ref = database.ref('Users');
    var moviecart = ref.child("User");
    // moviecart.set({
    //     movie_title: {props.addMovies.title},
    //     movie_id: {props.addMovies.movieId}
    // });



    // var ref = database.ref('Movie');
    // var ref = database.ref('User');
    // var movieref = ref.child(`User/Movie/`);
    // console.log("child: ", movieref);
    // ref.on('value',function(data){
    //   var movies = data.val();
    //   var keys = Object.keys(movies);
    //   var movielistings = document.getElementsByClassName('.movielisting');
    //   console.log("keys: ",keys);
    //   for(var i = 0; i < keys.length;i++){
    //     var eachkey = keys[i];
    //     var moviename = movies[eachkey].title;
    //     var movieid = movies[eachkey].movieId;
    //     var li = document.createElement('li',moviename + ":" + movieid);
    //     console.log(moviename, movieid);
    //   }
    //
    //   // console.log("check the data from the redux cart using firebase ",data.val())
    // }, (error) => console.log(error));
    console.log("i did load");
  }




  render(){
    return (
       <div>
         <Bar />
         <div className="page-container">
            <h1 className="title">My Shopping Cart</h1>
            <ol id = 'movies'></ol>
            <hr style={{width:'100%', color: 'white', height: '20px'}} />
            <div>
                {this.props.empty === 0 ?
                  <div><h1 style={{fontSize: '30px'}}>Empty Cart!</h1></div>
                                        :

                  (
                    <div>
                     <div className="movieItemGrid">
                        {this.props.addMovies.map((movie) => (
                              <div className="movieItemGrid">
                                        {/*<FontAwesomeIcon onClick = {() => this.props.onDeleteCart(movie.movieId)} style={{ margin: '0'}} icon="trash-alt" size="2x" />*/}
                              </div>
                            ))}
                      </div>
                      <div className="movieItemGrid">
                         {this.props.movie_img.map((movieimage) => (
                           <div className ="movieItems">

                              <img src={`${IMAGE_BASE_URL}${CART_IMAGE_SIZE}${movieimage.imageId}`}
                                    onload={this.showId}
                               />
                             <FontAwesomeIcon onClick = {() => this.props.onDeleteCart(movieimage.movieId)} style={{marginLeft: "40%", paddingTop: "10px"}} icon="trash-alt" size="2x" />
                             <h1 style={{fontSize: '30px'}}>Price: $4.99 </h1>

                           </div>
                        ))}
                      </div>
                    </div>
                  )}
            </div>
            <p style={{margin: '10px', textAlign: 'center' , fontSize: '30px'}}>Total Cost: ${this.props.total_cost}</p>
            <p style={{margin: '10px', textAlign: 'center' ,fontSize: '30px'}}>Your balence: ${this.props.user_bal}</p>
            <CheckoutButton />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return{
    addMovies: state.MovieCart,
    movie_img: state.MovieImageCart,
    total_cost: state.TotalCost,
    empty: state.deletedItems,
    user_bal: state.userBalence
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onShowId: () => dispatch({type: actionTypes.SHOW_CART}),
    onAddCost: (cost) => dispatch({type: actionTypes.ADD_COST, cost: cost}),
    onDeleteCart: (id) => dispatch({type: actionTypes.DELETE_CART, id: id})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxCart);
