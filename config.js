import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig={
    apiKey: "AIzaSyDPKCJD2w5fMdrHR8VL3epBOPUZ19W4w7Y",
    authDomain: "authentication-56a86.firebaseapp.com",
    projectId: "authentication-56a86",
    storageBucket: "authentication-56a86.appspot.com",
    messagingSenderId: "968874053555",
    appId: "1:968874053555:web:5595af75deee292f1705c6",
    measurementId: "G-11N45CJ3JX"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    
}