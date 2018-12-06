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
// import FourColGrid from '../elements/FourColGrid/FourColGrid';
import { API_KEY, API_URL, IMAGE_BASE_URL, POSTER_SIZE, CART_IMAGE_SIZE } from '../../../config.js';

library.add(faTrashAlt);

class reduxCart extends Component {
    state = {
      loaded: false,
      id: 0
    }

  componentDidMount(){
    console.log("i did load");
  }


  render(){
    return (
       <div>
         <Bar />
         <div className="page-container">
            <h1 className="title">My Shopping Cart</h1>
            
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


                                        <FontAwesomeIcon onClick = {() => this.props.onDeleteCart(movie.movieId)} style={{position: 'center'}} icon="trash-alt" size="2x" />


                              </div>
                            ))}
                      </div>
                      <div className="movieItemGrid">
                         {this.props.movie_img.map((movieimage) => (
                           <div className ="movieItems">
                              <img src={`${IMAGE_BASE_URL}${CART_IMAGE_SIZE }${movieimage.imageId}`}
                                    onload={this.showId}
                               />
                             <h1>Price: $4.99 </h1>
                           </div>
                        ))}
                      </div>
                    </div>
                  )}
            </div>
            <p style={{margin: '10px', textAlign: 'center' , fontSize: '30px'}}>Total Cost: ${this.props.total_cost}</p>

            <p style={{margin: '10px', textAlign: 'center' ,fontSize: '30px'}}>Your balence: ${this.props.user_bal}</p>
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
