// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app"
import "firebase/compat/auth";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT5JbcMdzVtFUnyBA0E9NgWFbw9icYPS0",
  authDomain: "ecommerce-f1704.firebaseapp.com",
  projectId: "ecommerce-f1704",
  storageBucket: "ecommerce-f1704.appspot.com",
  messagingSenderId: "129907392811",
  appId: "1:129907392811:web:ff32731150c4fa4e9f056e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth =firebase.auth();
export const googleAuthProvider =new firebase.auth.GoogleAuthProvider();
// export const analytics = getAnalytics(app);

