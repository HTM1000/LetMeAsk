// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:process.env.REACT_APP_API_KEY,
  authDomain:process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL:process.env.REACT_APP_DATABASE_ULR,
  projectId:process.env.REACT_APP_PROJECT_ID,
  storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId:process.env.REACT_APP_MESSASING_SENDER_ID,
  appId:process.env.REACT_APP_APP_ID,
  measurementId:process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }