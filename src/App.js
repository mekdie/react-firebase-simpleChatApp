import "./App.css";

//firebase SDK
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectioData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
    //config
    apiKey: "AIzaSyC_jTZES2d4nYaqpUCiOdos5g6OXTIKqvY",
    authDomain: "react-basic-chat-5dccb.firebaseapp.com",
    projectId: "react-basic-chat-5dccb",
    storageBucket: "react-basic-chat-5dccb.appspot.com",
    messagingSenderId: "173222891115",
    appId: "1:173222891115:web:7e568d2354ba2ac57f2b2e",
    measurementId: "G-M7MSN37PL1",
});

function App() {
    return <div className="App"></div>;
}

export default App;
