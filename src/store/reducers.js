import * as actionTypes from './actions';
import { Redirect } from "react-router-dom";

const initialState = {
  MovieId: 0,
  MovieCart: [],
  WishList: [],
}

const reducer = (state = initialState, action) => {

  if(action.type === actionTypes.ADD_MOVIE_ID){
    console.log("i am in add movie id");
    console.log("check the state from redux: ",state);
    const newMovieCart = {
      userId: Math.random(),
      movieId: action.cartData.id,
      title: action.cartData.title
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
      title: action.wishData.title
    }
    return{
      ...state,
      WishList: state.WishList.concat(newMovieWish)
    }
  }

  if(action.type === actionTypes.SHOW_CART){
    console.log("i am in the cart page");
    console.log("Cart state: ",state.MovieCart)
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

  return state;
}

export default reducer;
