import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, query, where } from 'firebase/firestore/lite';
import firebaseConfig from '../util/firebaseConfig';

//Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const transactionCollection = collection(db, 'transactions');

export const createTransaction = async (data) => {
  const result = await addDoc(transactionCollection, {
     ...data
  });

  return result;
}

export const getTransaction = async (email) => {
    try {
        // Create a query to find transaction with specified email
        const q = query(collection(db, 'transactions'), where('email', '==', email));

        // Execute the query
        const querySnapshot = await getDocs(q);

        // Check if any transaction found
        if (!querySnapshot.empty) {
            // Assuming only one transaction is found with the given email
            const transaction = querySnapshot.docs[0].data();
            return transaction;
        } else {
            // Transaction not found with the given email
            return null;
        }
    } catch (error) {
        console.error('Error getting transaction by email:', error);
        throw error;
    }
}

export const updateTransaction = async (email, newData) => {
  
    try {
      // Create a query to find transaction with specified email
      const q = query(collection(db, 'transactions'), where('email', '==', email));
      
      // Execute the query
      const querySnapshot = await getDocs(q);
      
      // Check if any transaction found
      if (!querySnapshot.empty) {
        // Assuming only one transaction is found with the given email
        const transactionDoc = querySnapshot.docs[0];
        const transactionRef = doc(db, 'transactions', transactionDoc.id);
  
        // Update transaction document with new data
        await updateDoc(transactionRef, newData);
        console.log('Transaction updated successfully');
      } else {
        // Transaction not found with the given email
        console.log('Transaction not found');
      }
    } catch (error) {
      console.error('Error updating transaction by email:', error);
      throw error;
    }
  };