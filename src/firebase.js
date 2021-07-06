import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCLe0nYlxcc_a8TSosPi4BSy-9YLOb6shA',
  authDomain: 'photo-editing-web-app.firebaseapp.com',
  databaseURL: 'https://photo-editing-web-app.firebaseio.com',
  projectId: 'photo-editing-web-app',
  storageBucket: 'photo-editing-web-app.appspot.com',
  messagingSenderId: '408375566573',
  appId: '1:408375566573:web:13e8dd415846573ef6ece4',
  measurementId: 'G-LEQ801PHGG'
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };
