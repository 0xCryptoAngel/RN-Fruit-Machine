import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, query, where } from 'firebase/firestore/lite';
import firebaseConfig from '../util/firebaseConfig';

//Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userCollection = collection(db, 'users');

export const createUser = async (data) => {
    const result = await addDoc(userCollection, data);

    return result;
}