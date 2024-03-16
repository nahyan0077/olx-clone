import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAg9iA6VyfGni0r1_nyKYLW-LDjSl8Z7kU",
  authDomain: "olx-clone-64594.firebaseapp.com",
  projectId: "olx-clone-64594",
  storageBucket: "olx-clone-64594.appspot.com",
  messagingSenderId: "821353473280",
  appId: "1:821353473280:web:6c46017eeb8e21fa89ffe5",
  measurementId: "G-8FWWB0YYVX"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

export { firestore };