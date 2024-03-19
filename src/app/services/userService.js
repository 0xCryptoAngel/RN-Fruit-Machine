import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, query, where } from 'firebase/firestore/lite';
import firebaseConfig from '../util/firebaseConfig';

//Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userCollection = collection(db, 'users');

export const createUser = async (data) => {
    const result = await addDoc(userCollection, {
       ...data,
       "coins": 50000,
       "spins": 50,
       "golden_ticket_owned": false,
       "spin_no": 0,
        "hasFrom": {
            seconds: 0,
        },
        'shield': 0,
    });

    return result;
}