# Learning React 2022 - House Marketplace Project


### If you want to run this app make sure you have a firebase.config.js in your `src` directory with your credentials from firebase!

```
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "KEY HERE",
  authDomain: "BLAH BLAH",
  projectId: "BLAH",
  storageBucket: "MORE BLAH",
  messagingSenderId: "STUFF HERE TOO",
  appId: "YOUR APP ID FROM FIREBASE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()

