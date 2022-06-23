import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7IZlQshFY95vrhbbNmyvxgOlFwMTTY8E",
  authDomain: "deltika-authentication.firebaseapp.com",
  projectId: "deltika-authentication",
  storageBucket: "deltika-authentication.appspot.com",
  messagingSenderId: "592684998678",
  appId: "1:592684998678:web:e6af13d7b9e8b91fc0d537",
  measurementId: "G-QJE3JZ9FQV",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
