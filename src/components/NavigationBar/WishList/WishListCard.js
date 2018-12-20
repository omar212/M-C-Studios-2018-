import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import { connect } from 'react-redux';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import * as actionTypes from '../../../store/actions';
import Typography from '@material-ui/core/Typography';
import {Card, CardTitle, CardText, CardActions, CardMenu, IconButton, Button } from 'react-mdl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { TwitterIcon } from 'react-share';
import './WishList.css';

library.add(faCartPlus, faStar);

const WishListCard = (props) => {

{/*marginLeft: '105px'*/}
  return (
    <Card shadow={0} style={{margin: '2%'}}>
        <CardTitle style={{ height: "75vh", width:"86vw" ,backgroundImage: `url(${props.imageWish})`,backgroundRepeat: 'no-repeat', backgroundSize: "contain"}}> {props.wish.title} </CardTitle>
      <CardActions style={{backgroundColor: 'gray'}} border>
          <div className="AddBtn">
            <FontAwesomeIcon onClick={() => {props.onAddMovieId(props.movieId, props.Movietitle, props.imageId);
                            props.onAddImageCart(props.imageId, props.movieId);
                            props.onAddCost(props.movieId, 4.99)}} icon="cart-plus" size="4x"   className="CartBtn" />
           </div>
           {/* <div className="TrashBtn">
               {props.movie_img_wish.map((movieimage) => (
                   <FontAwesomeIcon onClick = {() => this.props.onDeleteCart(movieimage.imageId)}  style={{marginLeft: "40%", paddingTop: "10px"}} icon="trash-alt" size="2x" />
              ))}
          </div> */}
            <div className="TrashBtn">
              <FontAwesomeIcon onClick = {() => {props.onDeleteWish(props.imageId,props.movieId)}}
                               style={{marginLeft: "40%", paddingTop: "10px"}}
                               icon="trash-alt" size="2x" />
                           </div>
        </CardActions>
    </Card>

  );
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
    onAddCost: (id, cost) => dispatch({type: actionTypes.ADD_COST, id: id, cost: cost}),
    onDeleteWish: (imageId, movieId) => dispatch({type: actionTypes.DELETE_WISH, imageId: imageId, movieId: movieId })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WishListCard);
