// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdGyw4k9jUoeZ0HGxJflQ-0nJGgHiX6ZE",
  authDomain: "todo-app-c81b2.firebaseapp.com",
  projectId: "todo-app-c81b2",
  storageBucket: "todo-app-c81b2.appspot.com",
  messagingSenderId: "356962005114",
  appId: "1:356962005114:web:fcd88b3621f6f3f5e14bc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
