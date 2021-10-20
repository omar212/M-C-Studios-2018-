import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyB5viw5l3mYUkgbRHjlhyi9aUHgfmwpFz0",
  authDomain: "new-movie-website-5967f.firebaseapp.com",
  projectId: "new-movie-website-5967f",
  storageBucket: "new-movie-website-5967f.appspot.com",
  messagingSenderId: "708802755202",
  appId: "1:708802755202:web:7f2ee4634c19f1d3ced29b",
  measurementId: "G-8SZJMKLM5B"
};


firebase.initializeApp(config);

export default firebase;
