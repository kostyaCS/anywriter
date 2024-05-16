import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from '@firebase/firestore';
import { getDatabase } from "@firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCCkmA18d3nUEss1SuM9D25nLMNpwaQHL0",
    authDomain: "anywriter-a18d6.firebaseapp.com",
    projectId: "anywriter-a18d6",
    storageBucket: "anywriter-a18d6.appspot.com",
    messagingSenderId: "992235417335",
    appId: "1:992235417335:web:86d503e516fd982475adf2",
    measurementId: "G-NKYJZD6143",
    databaseURL: "https://anywriter-a18d6-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);
const storage = getStorage(app);

export { auth, db, rtdb, storage };
