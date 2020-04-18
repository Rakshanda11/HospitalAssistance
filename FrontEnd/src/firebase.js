import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCZAFawqLPtgTiTsvX-y2tCom8yUHiYszE",
  authDomain: "todolist-21422.firebaseapp.com",
  databaseURL: "https://todolist-21422.firebaseio.com",
  projectId: "todolist-21422",
  storageBucket: "todolist-21422.appspot.com",
  messagingSenderId: "71390210238",
  appId: "1:71390210238:web:b7b6c0800a3a28059396ef"
};
// Initialize Firebase
firebase.initializeApp(config);

export default firebase;