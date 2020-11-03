import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAMqhiChAY5ZRBpT1yobIvO2WUENpWN1oQ",
  authDomain: "chatapp-a68c7.firebaseapp.com",
  databaseURL: "https://chatapp-a68c7.firebaseio.com",
  projectId: "chatapp-a68c7",
  storageBucket: "chatapp-a68c7.appspot.com",
  messagingSenderId: "1091709242015",
  appId: "1:1091709242015:web:2542bcddd266c254a130aa",
  measurementId: "G-9L46LV773N",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
