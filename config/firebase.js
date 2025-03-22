// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCH8WKuI0Qx-l6UUufUwh8BFgbj9NbRR0E",
    authDomain: "nsut-resources-b36f2.firebaseapp.com",
    projectId: "nsut-resources-b36f2",
    storageBucket: "nsut-resources-b36f2.appspot.com",
    messagingSenderId: "773928738811",
    appId: "1:773928738811:web:5d2641b58488643823355e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
