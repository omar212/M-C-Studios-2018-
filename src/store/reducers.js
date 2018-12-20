import * as actionTypes from './actions';
import { Redirect } from "react-router-dom";
import firebase from "firebase";

const initialState = {
  AllMovies:{},
  MovieId: 0,
  MovieCart: [],
  WishList: [],
  MovieImageCart: [],
  MovieImageWish: [],
  TotalCost: 0,
  deletedItems: 1,
  userBalence: 9.98,
  User:[]

}
const reducer = (state = initialState, action) => {

  if(action.type === actionTypes.ADD_MOVIE_ID){
    console.log("i am in add movie id");
    console.log("check the state of the movie cart from redux: ",state.MovieCart);
    console.log("image action: ", action.cartData.image);

    const newMovieCart = {
      userId: Math.random(),
      movieId: action.cartData.id,
      title: action.cartData.title,
      image: action.cartData.image
    }
      var database = firebase.database();
      var Usersref = database.ref('Users');

    return{
      ...state,
      deletedItems: 1,
      MovieCart: state.MovieCart.concat(newMovieCart),
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

  if(action.type === actionTypes.ADD_IMAGE_CART){
    console.log("i am in the add image cart reducer");
    console.log("movie image for cart state: ",state.MovieImageCart)
    const addImageCart = {
      imageId: action.imageId,
      movieId: action.movieId
    }

    const newArray = [...state.MovieCart];
    console.log("check this out before anything happens ", newArray)
    const nameVar = state.MovieCart.image
    console.log("nameVar: ", nameVar)
    const updatedMovieArray = state.MovieCart.filter(result => result.imageId === action.imageId);
    // if(newArray.indexOf(imageVar) === -1){
    //   var dup = newArray.indexOf(imageVar)
    //   console.log("i found one similar it was", action.imageId);
    //   console.log("heres the object without the duplicate: ", )
    // }
    // console.log("****addimagecart imageId*** ", action.imageId);
    // console.log("****new array image id*** ", newArray.imageId);
    // console.log("1) image Cart: ", addImageCart);
    // console.log("2) new array: ", newArray);
    // console.log("3) updatedMovieArray: ", updatedMovieArray);
    return{
      ...state,
      deletedItems: 1,
      MovieImageCart: state.MovieImageCart.concat(addImageCart)
    }
  }

  if(action.type === actionTypes.ADD_IMAGE_WISH){
    console.log("i am in the add image wish reducer");
    console.log("movie image state: ",state.MovieImageWish);
    const imageWish = {
      imageId: action.imageId,
      movieId: action.movieId
    }
    console.log("IMAGE ID ACTION FROM ADD IMAGE WISH IS: ", state.MovieImageWish.concat(action.imageId));
    console.log("MOVIE ID ACTION FROM ADD IMAGE WISH IS: ", state.MovieImageWish.concat(action.movieId));
    console.log("MOVIE IMAGE WISH AFTER ACTION IS: ", state.MovieImageWish.concat(imageWish));
    return{
      ...state,
      deletedItems: 1,
      MovieImageWish: state.MovieImageWish.concat(imageWish)
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

  if(action.type === actionTypes.DELETE_WISH){

    const newArray = [...state.WishList];
    const newArray1 = [...state.MovieImageWish];

    console.log("NEW ARRAY IS: ", newArray);

    const updatedMovieArray = newArray.filter(result => result.movieId !== action.movieId);
    const updatedMovieImageArray = newArray1.filter(result => result.imageId !== action.imageId);

    console.log("the updatedMovieArray is: ", updatedMovieArray);
    console.log("the updatedMovieImageArray is: ", updatedMovieImageArray);
    console.log("the WishList is: ", state.WishList);
    console.log("the Movie image wish is: ", state.MovieImageWish);
    console.log("ACTION IMAGE ID OF DELETED IMAGE: ", action.imageId);
    console.log("ACTION MOVIE ID OF DELETED ID: ", action.movieId);


    return{
      ...state,
      WishList: updatedMovieArray,
      MovieImageWish: updatedMovieImageArray,
    }
  }

  if(action.type === actionTypes.ADD_EMAIL){
    console.log("i GOT THE EMAIL");
    console.log("state of email is: ", state.User);
    console.log("EMAIL IS: ",action.email)
    const emailobj = {
      email: action.email
    }
    const newEmail = [...state.User]
    const updatedCheckDup = newEmail.filter(result => result.email === action.email);
    if(updatedCheckDup.length === 1){
      return {
        User: newEmail
      }
    }

    return{
      ...state.User,
      User: state.User.concat(emailobj)
    }
  }

  return state;
}

export default reducer;
