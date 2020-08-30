import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const apiKey = process.env.REACT_APP_API_KEY_FIREBASE

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "chat-487e3.firebaseapp.com",
  databaseURL: "https://chat-487e3.firebaseio.com",
  projectId: "chat-487e3",
  storageBucket: "chat-487e3.appspot.com",
  messagingSenderId: "566533927637",
  appId: "1:566533927637:web:6b17a4a881a49fd54a285c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth
export const db = firebase.database()