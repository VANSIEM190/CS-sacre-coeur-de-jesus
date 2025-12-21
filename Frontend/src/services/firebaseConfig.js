// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC20DBozuGKyHJhAv7LceIry8H1_hbByBE',
  authDomain: 'sacre-coeur-project.firebaseapp.com',
  projectId: 'sacre-coeur-project',
  storageBucket: 'sacre-coeur-project.firebasestorage.app',
  messagingSenderId: '987834858060',
  appId: '1:987834858060:web:d1ec9004284c8a41b792e9',
  measurementId: 'G-2DQL06YVYB',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
