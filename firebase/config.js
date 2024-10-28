import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp, query, onSnapshot, orderBy } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "",
    authDomain: "chatdemo-6eaa7.firebaseapp.com",
    projectId: "chatdemo-6eaa7",
    storageBucket: "chatdemo-6eaa7.appspot.com",
    messagingSenderId: "443001770306",
    appId: "1:443001770306:web:d2851ccef84ba33f9eb8db"
  }

initializeApp(firebaseConfig)

const firestore = getFirestore()

const MESSAGES = 'messages'

export { 
    firestore,
    collection, 
    addDoc,
    serverTimestamp, 
    MESSAGES,
    query,
    onSnapshot,
    orderBy,
}