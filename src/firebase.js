// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCaPatCUTJglEe0ltboCIcXve3DLKQ9y5Y",
    authDomain: "bizconnect-lanka.firebaseapp.com",
    projectId: "bizconnect-lanka",
    storageBucket: "bizconnect-lanka.firebasestorage.app",
    messagingSenderId: "877970392497",
    appId: "1:877970392497:web:b59e7e8fc60656b6056990"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
