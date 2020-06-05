import firebase from "firebase/app"
import "firebase/auth";





try {
    firebase.initializeApp({
        apiKey: "AIzaSyDjl80n7jhBGTjElcxB4pbq3L5X2CCNDbc",
        authDomain: "bowdawn-jade.firebaseapp.com",
        databaseURL: "https://bowdawn-jade.firebaseio.com",
        projectId: "bowdawn-jade",
        storageBucket: "bowdawn-jade.appspot.com",
        messagingSenderId: "224887390799",
        appId: "1:224887390799:web:ed893c1fa375196a46e03a",
        measurementId: "G-CFK77J8VVQ"
    });
} catch (error) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test(error.message)) {
        // eslint-disable-next-line no-console
        console.error('Firebase admin initialization error', error.stack);
    }
}


export default firebase;
