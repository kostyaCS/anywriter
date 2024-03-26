import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCCkmA18d3nUEss1SuM9D25nLMNpwaQHL0",
    authDomain: "anywriter-a18d6.firebaseapp.com",
    projectId: "anywriter-a18d6",
    storageBucket: "anywriter-a18d6.appspot.com",
    messagingSenderId: "992235417335",
    appId: "1:992235417335:web:86d503e516fd982475adf2",
    measurementId: "G-NKYJZD6143"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
