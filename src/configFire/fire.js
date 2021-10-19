import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDY_ZQTHd4bNNNOZ1lTTOSvUzo0-XuSVJ8",
    authDomain: "offical-movie-website.firebaseapp.com",
    databaseURL: "https://offical-movie-website.firebaseio.com",
    projectId: "offical-movie-website",
    storageBucket: "offical-movie-website.appspot.com",
    messagingSenderId: "599088107743"
};

firebase.initializeApp(config);

export default firebase;
