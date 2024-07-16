
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDweamfVVGezOqgzsNgkBMjT1NX4hGerbk",
  authDomain: "edible-cutlery.firebaseapp.com",
  databaseURL: "https://edible-cutlery-default-rtdb.firebaseio.com",
  projectId: "edible-cutlery",
  storageBucket: "edible-cutlery.appspot.com",
  messagingSenderId: "97847430125",
  appId: "1:97847430125:web:affc7ee4be79ee65b1f5e4",
  measurementId: "G-EPYND4NR35"
};
 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);