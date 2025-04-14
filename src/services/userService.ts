
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  QueryDocumentSnapshot 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

// Convert Firestore document to UserProfile type
const convertUser = (doc: QueryDocumentSnapshot): UserProfile => {
  const data = doc.data();
  return {
    uid: doc.id,
    name: data.name,
    email: data.email,
    role: data.role,
    createdAt: data.createdAt
  };
};

// Get user by ID
export const getUserById = async (userId: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        uid: userDoc.id,
        name: data.name,
        email: data.email,
        role: data.role,
        createdAt: data.createdAt
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

// Get all users
export const getAllUsers = async (): Promise<UserProfile[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    return querySnapshot.docs.map(convertUser);
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
};

// Get all student artists
export const getStudentArtists = async (): Promise<UserProfile[]> => {
  try {
    const artistsQuery = query(
      collection(db, 'users'),
      where('role', '==', 'student')
    );
    
    const querySnapshot = await getDocs(artistsQuery);
    return querySnapshot.docs.map(convertUser);
  } catch (error) {
    console.error('Error getting student artists:', error);
    throw error;
  }
};
