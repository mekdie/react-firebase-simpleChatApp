import React, { useRef, useState } from "react";
import "./App.css";

// v9 compat packages are API compatible with v8 code
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
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

const auth = firebase.auth();
const firestore = firebase.firestore();
function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    };

    return <button onClick={signInWithGoogle}>Sign In</button>;
}

function SignOut() {
    return (
        auth.currentUser && (
            <button onClick={() => auth.signOut()}>Sign Out</button>
        )
    );
}

function ChatRoom() {
    const dummy = useRef();
    const messagesRef = firestore.collection("messages");
    const query = messagesRef.orderBy("createdAt").limit(25);

    const [messages] = useCollectionData(query, { idField: "id" });

    const [formValue, setFormValue] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL, displayName } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
            displayName,
        });

        setFormValue("");

        dummy.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <main>
                {messages &&
                    messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}

                <span ref={dummy}></span>
            </main>

            <form onSubmit={sendMessage}>
                <input
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    placeholder="say something nice"
                />

                <button type="submit" disabled={!formValue}>
                    🕊️
                </button>
            </form>
        </>
    );
}

function ChatMessage(props) {
    const { text, uid, photoURL, displayName } = props.message;

    const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

    return (
        <>
            <h6 style={{ textAlign: "right", color: "white", margin: 0 }}>
                {displayName}
            </h6>
            <div className={`message ${messageClass}`}>
                <img
                    src={
                        photoURL ||
                        "https://api.adorable.io/avatars/23/abott@adorable.png"
                    }
                    alt="profile"
                />
                <p>{text}</p>
            </div>
        </>
    );
}

function App() {
    const [user] = useAuthState(auth);
    return (
        <div className="App">
            <header>
                <h2>⚛️🔥💬</h2>
                <SignOut />
            </header>
            <section>{user ? <ChatRoom /> : <SignIn />}</section>
        </div>
    );
}

export default App;
