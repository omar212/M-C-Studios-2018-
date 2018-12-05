import * as actionTypes from './actions';
import { Redirect } from "react-router-dom";

const initialState = {
  MovieId: 0,
  MovieCart: [],
  WishList: [],
  MovieImageCart: [],
  MovieImageWish: [],
}

const reducer = (state = initialState, action) => {

  if(action.type === actionTypes.ADD_MOVIE_ID){
    console.log("i am in add movie id");
    console.log("check the state from redux: ",state);
    const newMovieCart = {
      userId: Math.random(),
      movieId: action.cartData.id,
      title: action.cartData.title,
      image: action.cartData.image
    }

    return{
      ...state,
      MovieCart: state.MovieCart.concat(newMovieCart)
    }
  }
  if(action.type === actionTypes.ADD_WISH_LIST_ID){
    console.log("i am in add movie id");
    console.log("check the state from redux: ",state.WishList);
    const newMovieWish = {
      userId: Math.random(),
      movieId: action.wishData.id,
      title: action.wishData.title,
      image: action.wishData.image,
    }
    return{
      ...state,
      WishList: state.WishList.concat(newMovieWish)
    }
  }

  if(action.type === actionTypes.SHOW_CART){
    console.log("i am in the cart page");
    console.log("Cart state: ",state.MovieCart)
    console.log("the cart image is ", state.MovieCart.image);
    return{
      ...state.MovieCart,
    }
  }

  if(action.type === actionTypes.SHOW_WISH_LIST){
    console.log("i am in the wish list page");
    console.log("Wish List state: ",state.WishList)
    return{
      ...state.WishList,
    }
  }

  if(action.type === actionTypes.ADD_IMAGE_CART){
    console.log("i am in the add image cart reducer");
    console.log("movie image for cart state: ",state.MovieImageCart)
    return{
      ...state,
      MovieImageCart: state.MovieImageCart.concat(action.imageId)
    }
  }

  if(action.type === actionTypes.ADD_IMAGE_WISH){
    console.log("i am in the add image wish reducer");
    console.log("movie image state: ",state.MovieImageWish)
    return{
      ...state,
      MovieImageWish: state.MovieImageWish.concat(action.imageId)
    }
  }

  return state;
}

export default reducer;
