import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBZL7JMoHHngmnCUP6G50uPWeXcs5hhWww",
  authDomain: "artisanal-le-comptoir-store1.firebaseapp.com",
  projectId: "artisanal-le-comptoir-store1",
  storageBucket: "artisanal-le-comptoir-store1.appspot.com",
  messagingSenderId: "1092076028424",
  appId: "1:1092076028424:web:57f136a95e1f529a4a07bd",
  measurementId: "G-HBMWBKYHR4"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const storage=getStorage(app)
export const db=getFirestore(app)


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
