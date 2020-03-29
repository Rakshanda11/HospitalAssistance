import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// var config = {
//     apiKey: "AIzaSyCZAFawqLPtgTiTsvX-y2tCom8yUHiYszE",
//     authDomain: "todolist-21422.firebaseapp.com",
//     databaseURL: "https://todolist-21422.firebaseio.com",
//     projectId: "todolist-21422",
//     storageBucket: "todolist-21422.appspot.com",
//     messagingSenderId: "71390210238",
//     appId: "1:71390210238:web:b7b6c0800a3a28059396ef"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(config);
//   const db = firebase.firestore();
//   db.settings({ timestampsInSnapshots: true });

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
