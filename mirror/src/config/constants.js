import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyBO2MbwoV55Ot8ARaF30kv9eh2SAYiOFcU",
    authDomain: "faces-4.firebaseapp.com",
    databaseURL: "https://faces-4.firebaseio.com",
    projectId: "faces-4",
    storageBucket: "faces-4.appspot.com",
    messagingSenderId: "977142206870"
};
firebase.initializeApp(config);
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseAuth = firebase.auth;
export const db = firebase.firestore().settings({ timestampsInSnapshots: true });
