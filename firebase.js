import firebase from "firebase/app"
import "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyDjl80n7jhBGTjElcxB4pbq3L5X2CCNDbc",
    authDomain: "bowdawn-jade.firebaseapp.com",
    databaseURL: "https://bowdawn-jade.firebaseio.com",
    projectId: "bowdawn-jade",
    storageBucket: "bowdawn-jade.appspot.com",
    messagingSenderId: "224887390799",
    appId: "1:224887390799:web:ed893c1fa375196a46e03a",
    measurementId: "G-CFK77J8VVQ"
};




export default !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();