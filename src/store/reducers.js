import * as actionTypes from './actions';
import { Redirect } from "react-router-dom";

const initialState = {
  MovieId: 0,
  MovieCart: [],
  WishList: [],
  MovieImageCart: [],
  MovieImageWish: [],
  TotalCost: 0,
  deletedItems: 1,
  userBalence: 9.98
}

const reducer = (state = initialState, action) => {

  if(action.type === actionTypes.ADD_MOVIE_ID){
    console.log("i am in add movie id");
    console.log("check the state of the movie cart from redux: ",state.MovieCart);
    const newMovieCart = {
      userId: Math.random(),
      movieId: action.cartData.id,
      title: action.cartData.title,
    }
    // let index = state.findIndex(el => el.event_id == action.event.event_id);
    // if(index == -1)
    //       return {
    //         ...state, action.event];
    //       }
    //   return state;


    return{
      ...state,
      deletedItems: 1,
      MovieCart: state.MovieCart.concat(newMovieCart)
    }
  }
  if(action.type === actionTypes.ADD_WISH_LIST_ID){
    console.log("i am in add movie id");
    console.log("check the wish list state from redux: ",state.WishList);
    const newMovieWish = {
      userId: Math.random(),
      movieId: action.wishData.id,
      title: action.wishData.title,
    }


    return{
      ...state,
      deletedItems: 1,
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
      deletedItems: 1,
      MovieImageCart: state.MovieImageCart.concat(action.imageId)
    }
  }

  if(action.type === actionTypes.ADD_IMAGE_WISH){
    console.log("i am in the add image wish reducer");
    console.log("movie image state: ",state.MovieImageWish)
    return{
      ...state,
      deletedItems: 1,
      MovieImageWish: state.MovieImageWish.concat(action.imageId)
    }
  }

  if(action.type === actionTypes.ADD_COST){
    console.log("i am in the added cost action");
    console.log("movie cost state: ",state.TotalCost)
    return{
      ...state,
      TotalCost: state.TotalCost += action.cost
    }
  }

  if(action.type === actionTypes.DELETE_CART){
    console.log("i am in the delete cart action");
    console.log("the id caught was: ", action.id);
    const newArray = [...state.MovieCart];
    console.log("NEW ARRAY IS: ", newArray);
    const updatedMovieArray = newArray.filter(result => result.id !== action.id);
    const updatedMovieImageArray = state.MovieImageCart.filter(result => result.id !== action.id);
    if(updatedMovieArray.length === 1){
      console.log("found");
      console.log("state movie cart::: ", state.MovieCart);
      console.log("state movie image cart::: ", state.MovieImageCart);
      const check = state.MovieCart.splice(0,1)
      console.log("length is now: ", check.length);
      console.log("total cost is now: ", state.TotalCost + 4.99);
      return{
        ...state,
        deletedItems: 0,
        MovieCart: state.MovieCart = [],
        MovieImageCart: state.MovieImageCart = [],
        TotalCost: state.TotalCost + 4.99
      }
    }

    // newArray.splice(id, 1);
    console.log("the updatedMovieArray is: ", updatedMovieArray);
    console.log("the updatedMovieImageArray is: ", updatedMovieImageArray);
    console.log("the MovieCart is: ", state.MovieCart);
    console.log("total cost is now: ", state.TotalCost + 4.99);
    return{
      ...state,
      MovieCart: state.MovieCart.splice(updatedMovieArray,1),
      MovieImageCart: state.MovieImageCart.splice(updatedMovieImageArray,1),
      TotalCost: state.TotalCost + 4.99
      // MovieImageCart:  state.MovieImage.concat(updatedMovieImageArray)
      // {console.log("state of movie id: ", state.MovieCart)},
      // {console.log("state of movie image id: ", state.MovieImageCart)}
    }
  }

  return state;
}

export default reducer;
