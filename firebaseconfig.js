import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBuBn1zjAl0eeWOQWpa2RnxkKUZoGSmT1Y",
    authDomain: "todoapp-8c2e9.firebaseapp.com",
    projectId: "todoapp-8c2e9",
    storageBucket: "todoapp-8c2e9.appspot.com",
    messagingSenderId: "229477816068",
    appId: "1:229477816068:web:2fdabc81897f2e9991e251"
};

// const app = initializeApp(firebaseConfig); 

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIRESTORE_AUTH = getAuth(FIREBASE_APP);