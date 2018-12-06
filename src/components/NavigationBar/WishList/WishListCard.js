import React from 'react';

import CardActionArea from '@material-ui/core/CardActionArea';
import { connect } from 'react-redux';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import {Card, CardTitle, CardText, CardActions, CardMenu, IconButton, Button } from 'react-mdl';
import './WishList.css';

const WishListCard = (props) => {

  return (
    <Card shadow={0} style={{width: '512px', margin: 'auto'}}>
        <CardTitle style={{color: 'white', height: '276px', background: `url(${props.imageWish})`}}> {props.addMovies.title} </CardTitle>
        <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Mauris sagittis pellentesque lacus eleifend lacinia...
        </CardText>
        <CardActions border>
            <Button colored>Get Started</Button>
            <Button colored>Add To Cart</Button>
        </CardActions>
        <CardMenu style={{color: '#fff'}}>
            <IconButton name="share" />
        </CardMenu>
    </Card>

  );
}

const mapStateToProps = state => {
  return{
    addMovies: state.MovieCart,
    movie_img: state.MovieImageWish
  }
}

export default connect(mapStateToProps)(WishListCard);
