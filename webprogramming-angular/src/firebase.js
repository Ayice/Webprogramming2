import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBkvdT8L4y1L3kTuWxh4bXBvewO3BOL2tk",
  authDomain: "todo-react-f11af.firebaseapp.com",
  databaseURL: "https://todo-react-f11af.firebaseio.com",
  messagingSenderId: "858014112741",
  projectId: "todo-react-f11af",
  storageBucket: "todo-react-f11af.appspot.com",
  appId: "1:858014112741:web:00534573b465897d4b6d0c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const fire = firebase.firestore();

// export const storage = firebase.storage();
