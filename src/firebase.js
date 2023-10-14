import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyB6RAsz3f20wEW3VcBpZMGNTIWz90-RdCc",
	authDomain: "practice-management-system.firebaseapp.com",
	projectId: "practice-management-system",
	storageBucket: "practice-management-system.appspot.com",
	messagingSenderId: "589602959389",
	appId: "1:589602959389:web:499779631ed489d07856f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);
const storage = getStorage(app);

export { db, auth, functions, storage };
