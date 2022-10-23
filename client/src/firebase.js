import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAMTybtXQHVXQ38_BAQC4g2rKZgI_2ZCSk",
    authDomain: "video-share-app-b954e.firebaseapp.com",
    projectId: "video-share-app-b954e",
    storageBucket: "video-share-app-b954e.appspot.com",
    messagingSenderId: "719043618051",
    appId: "1:719043618051:web:439985a3f96ddbd7467536"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;