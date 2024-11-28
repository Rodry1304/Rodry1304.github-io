import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDgTuX4cApcqGeaoDl0U76j2pdDrg6-rY",
    authDomain: "login-8b0d8.firebaseapp.com",
    projectId: "login-8b0d8",
    storageBucket: "login-8b0d8.appspot.com",
    messagingSenderId: "230827873763",
    appId: "1:230827873763:web:ea791b64f7941b06e7fcd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('loggedUserFName').innerText = userData.firstName;
                    document.getElementById('loggedUserLName').innerText = userData.lastName;
                    document.getElementById('loggedUserEmail').innerText = userData.email;
                } else {
                    console.log("No document found matching ID");
                }
            })
            .catch((error) => {
                console.error("Error getting document", error);
            });
    } else {
        console.log("User ID not found in local storage");
    }
});

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
});
