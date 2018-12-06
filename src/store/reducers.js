import * as actionTypes from './actions';
import { Redirect } from "react-router-dom";

const initialState = {
  AllMovies:{},
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
    console.log("new movie wish: ", newMovieWish);
    console.log("new movie wish with orginial state: ", state.WishList.concat(newMovieWish));

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
    const addImageCart = {
      imageId: action.imageId,
      movieId: action.movieId
    }
    return{
      ...state,
      deletedItems: 1,
      MovieImageCart: state.MovieImageCart.concat(addImageCart)
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
      TotalCost: state.TotalCost += action.cost,
      userBalence: state.userBalence -= 4.99
    }
  }

  if(action.type === actionTypes.DELETE_CART){
    console.log("i am in the delete cart action");
    console.log("the id caught was: ", action.id);

    const newArray = [...state.MovieCart];
    const newArray1 = [...state.MovieImageCart];

    console.log("NEW ARRAY IS: ", newArray);

    const updatedMovieArray = newArray.filter(result => result.movieId !== action.id);
    const updatedMovieImageArray = newArray1.filter(result => result.movieId !== action.id);

    console.log("the updatedMovieArray is: ", updatedMovieArray);
    console.log("the updatedMovieImageArray is: ", updatedMovieImageArray);
    console.log("the MovieCart is: ", state.MovieCart);
    console.log("total cost is now: ", state.TotalCost + 4.99);

    return{
      ...state,
      MovieCart: updatedMovieArray,
      MovieImageCart: updatedMovieImageArray,
      userBalence: state.userBalence + 4.99,
      TotalCost: state.TotalCost - 4.99
      // MovieImageCart:  state.MovieImage.concat(updatedMovieImageArray)
      // {console.log("state of movie id: ", state.MovieCart)},
      // {console.log("state of movie image id: ", state.MovieImageCart)}
    }
  }

  if(action.type === actionTypes.ADD_ALL_MOVIES){
    console.log("i am in the add all movies action");
    console.log("all movies: ",state.AllMovies)
    return{
      ...state,
      AllMovies: state.AllMovies.concat(action.allmovies)
    }
  }



  return state;
}

export default reducer;
