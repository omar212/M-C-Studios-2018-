import React from 'react';

import CardActionArea from '@material-ui/core/CardActionArea';
import { connect } from 'react-redux';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import * as actionTypes from '../../../store/actions';
import Typography from '@material-ui/core/Typography';
import {Card, CardTitle, CardText, CardActions, CardMenu, IconButton, Button } from 'react-mdl';
import './WishList.css';

const WishListCard = (props) => {


  return (
    <Card shadow={0} style={{width: '512px', margin: 'auto'}}>
        <CardTitle style={{color: 'white', height: '276px', background: `url(${props.imageWish})`}}> {props.wishcart.title} </CardTitle>
        <CardText>
          <h1 style={{color:'black'}}>/*insert title*/</h1>
        </CardText>
        <CardActions border>
            <Button colored>Get Started</Button>
           {/* <Button colored onClick={() => {this.props.onAddMovieId(this.props.wishcart.movieId, this.props.wishcart.title);
           //                                 this.props.onAddImageCart(this.props.movie_img_cart.imageId, this.props.movie_img_cart.movieId);
           //                                 this.props.onAddCost(4.99)}}>Add To Cart</Button>*/}
        </CardActions>
        <CardMenu style={{color: '#fff'}}>
            <IconButton name="share" />
        </CardMenu>
    </Card>

  );
}

const mapStateToProps = state => {
  return{
    wishcart: state.WishList,
    movie_img_cart: state.MovieImageCart,
    movie_img_wish: state.MovieImageWish,
    total_cost: state.TotalCost
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddMovieId: (id, title) => dispatch({type: actionTypes.ADD_MOVIE_ID, cartData:{id: id, title: title}}),
    onAddImageCart: (imageId, movieId) => dispatch({type: actionTypes.ADD_IMAGE_CART, imageId: imageId, movieId: movieId}),
    onAddCost: (cost) => dispatch({type: actionTypes.ADD_COST, cost: cost})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WishListCard);
