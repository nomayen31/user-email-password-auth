
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWWJflAyWx490ybA4JUR163pEHT1jRVRY",
  authDomain: "user-email-password-auth-c13bc.firebaseapp.com",
  projectId: "user-email-password-auth-c13bc",
  storageBucket: "user-email-password-auth-c13bc.appspot.com",
  messagingSenderId: "94147044839",
  appId: "1:94147044839:web:8206c60bfce52bea5c4942"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;