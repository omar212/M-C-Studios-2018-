import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDvQ9XzqmCmo9RdzpcJcRnT5KxeA4OQLTQ",
  authDomain: "mcstudio-database.firebaseapp.com",
  databaseURL: "https://mcstudio-database.firebaseio.com",
  projectId: "mcstudio-database",
  storageBucket: "mcstudio-database.appspot.com",
  messagingSenderId: "1013584784625"
};

firebase.initializeApp(config);

export default firebase;
