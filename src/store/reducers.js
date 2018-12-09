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
    console.log("FIRST" ,newMovieCart.movieId)

    var database = firebase.database();
    var Usersref = database.ref('User/User/Cart');
    var fireMovieId = Usersref.child('movieId');
    var fireMovieTitle = Usersref.child('title');

    const fireCart = {
      movieId: newMovieCart.movieId,
      title: newMovieCart.title
    }

    fireMovieId.push(fireCart.movieId);
    fireMovieTitle.push(fireCart.title);


    // var mycart = [...state.MovieCart]
    // for(var i = 0; i < mycart.length;i++){
    //   console.log("my cart title: ", mycart[i].title);
    //   if(mycart[i].title === newMovieCart.title){
    //     var removeIndex = mycart.filter(result => result.title === action.cartData.title);
    //     mycart.splice(removeIndex, 1);
    //     console.log("i found a similar one ",mycart[i].title)
    //   }else{
    //     console.log(" i did not");
    //   }
    // }
    // console.log("MY CART: ", mycart);

    // const checkForDuplicate = newMovieCart.indexOf(action.cartData.title)
    // const updatedMovieArray = newMovieCart.filter(result => result.movieId === action.id);
    // const updatedMovieImageArray = newArray1.filter(result => result.movieId === action.id);
    // let index = state.findIndex(el => el.event_id == action.event.event_id);
    // if(index == -1)
    //       return {
    //         ...state, action.event];
    //       }
    //   return state;
    // console.log("new array: ", newArray);
    // console.log("check for duplicate: ", checkForDuplicate);
    // console.log("check for another duplicate: ", updatedMovieArray);

    // if(newArray.indexOf(action.cartData.id) === -1){
    //   return {
    //     MovieCart: state.MovieCart.concat(newMovieCart)
    //   }
    // }else{
      // return {
      //   MoveieCart: state.MovieCart.concat(newMovieCart),
      //   deletedItems: 1,
      // }
      console.log("User: ", state.User.email);
    return{
      ...state,
      deletedItems: 1,
      MovieCart: state.MovieCart.concat(newMovieCart),
      // MovieCart: state.MovieCart.concat(newMovieCart)
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

    var database = firebase.database();
    var Usersref = database.ref('User/User/WishList');
    var fireMovieId = Usersref.child('movieId');
    var fireMovieTitle = Usersref.child('title');

    const fireWish = {
      movieId: newMovieWish.movieId,
      title: newMovieWish.title
    }

    fireMovieId.set(fireWish.movieId);
    fireMovieTitle.set(fireWish.title);

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
    console.log("****addimagecart imageId*** ", action.imageId);
    console.log("****new array image id*** ", newArray.imageId);
    console.log("1) image Cart: ", addImageCart);
    console.log("2) new array: ", newArray);
    console.log("3) updatedMovieArray: ", updatedMovieArray);
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
    // const newArray = [...state.MovieCart];
    // const updatedMovieArray = newArray.filter(result => result.movieId === action.id);
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
    console.log("the id caught was: ", action.id);

    const newArray = [...state.WishList];
    const newArray1 = [...state.MovieImageWish];

    console.log("NEW ARRAY IS: ", newArray);

    const updatedMovieArray = newArray.filter(result => result.movieId !== action.id);
    const updatedMovieImageArray = newArray1.filter(result => result.movieId !== action.id);

    console.log("the updatedMovieArray is: ", updatedMovieArray);
    console.log("the updatedMovieImageArray is: ", updatedMovieImageArray);
    console.log("the WishList is: ", state.WishList);


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
