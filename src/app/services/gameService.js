import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, query, where } from 'firebase/firestore/lite';
import firebaseConfig from '../util/firebaseConfig';

//Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userCollection = collection(db, 'users');

export const getUser = async (email) => {
    try {
        // Create a query to find user with specified email
        const q = query(collection(db, 'users'), where('email', '==', email));

        // Execute the query
        const querySnapshot = await getDocs(q);

        // Check if any user found
        if (!querySnapshot.empty) {
            // Assuming only one user is found with the given email
            const user = querySnapshot.docs[0].data();
            return user;
        } else {
            // User not found with the given email
            return null;
        }
    } catch (error) {
        console.error('Error getting user by email:', error);
        throw error;
    }
}

export const updateUser = async (email, newData) => {
  
    try {
      // Create a query to find user with specified email
      const q = query(collection(db, 'users'), where('email', '==', email));
      
      // Execute the query
      const querySnapshot = await getDocs(q);
      
      // Check if any user found
      if (!querySnapshot.empty) {
        // Assuming only one user is found with the given email
        const userDoc = querySnapshot.docs[0];
        const userRef = doc(db, 'users', userDoc.id);
  
        // Update user document with new data
        await updateDoc(userRef, newData);
        console.log('User updated successfully');
      } else {
        // User not found with the given email
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error updating user by email:', error);
      throw error;
    }
  };