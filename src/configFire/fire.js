import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDVL3Lvrvc0E4i6CiuY3Ay9wkjvZona4y0",
    authDomain: "login-form-try-2.firebaseapp.com",
    databaseURL: "https://login-form-try-2.firebaseio.com",
    projectId: "login-form-try-2",
    storageBucket: "login-form-try-2.appspot.com",
    messagingSenderId: "20498174109"
};

firebase.initializeApp(config);

export default firebase;
