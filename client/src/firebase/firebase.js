import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyALMzlCNzn5Z3oOm5lLtadz1Ir0QcGAOwk",
	authDomain: "sentinic-9f96b.firebaseapp.com",
	projectId: "sentinic-9f96b",
	storageBucket: "sentinic-9f96b.appspot.com",
	messagingSenderId: "51332565408",
	appId: "1:51332565408:web:7101b744cf6e38c1f7fcc5",
	measurementId: "G-RXJ0Z94V1F",
};

// eslint-disable-next-line no-unused-vars
const firebase = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
