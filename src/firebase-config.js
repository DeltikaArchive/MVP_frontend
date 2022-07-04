import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyC7IZlQshFY95vrhbbNmyvxgOlFwMTTY8E",
//   authDomain: "deltika-authentication.firebaseapp.com",
//   projectId: "deltika-authentication",
//   storageBucket: "deltika-authentication.appspot.com",
//   messagingSenderId: "592684998678",
//   appId: "1:592684998678:web:e6af13d7b9e8b91fc0d537",
//   measurementId: "G-QJE3JZ9FQV",
// };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcxQ7HwnKd5zDnOROQiflPjR8bPEXAOu8",
  authDomain: "deltika-users.firebaseapp.com",
  projectId: "deltika-users",
  storageBucket: "deltika-users.appspot.com",
  messagingSenderId: "1046199910356",
  appId: "1:1046199910356:web:85437f0e5bb048eb0fe041",
  measurementId: "G-9F89CXQZBN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
