
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Comment {
  id: string;
  artworkId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

// Convert Firestore document to Comment type
const convertComment = (doc: QueryDocumentSnapshot): Comment => {
  const data = doc.data();
  return {
    id: doc.id,
    artworkId: data.artworkId,
    userId: data.userId,
    userName: data.userName,
    content: data.content,
    createdAt: data.createdAt.toDate().toISOString()
  };
};

// Get comments for an artwork
export const getCommentsByArtwork = async (artworkId: string): Promise<Comment[]> => {
  try {
    const commentsQuery = query(
      collection(db, 'comments'),
      where('artworkId', '==', artworkId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(commentsQuery);
    return querySnapshot.docs.map(convertComment);
  } catch (error) {
    console.error('Error getting comments:', error);
    throw error;
  }
};

// Create a new comment
export const createComment = async (
  artworkId: string,
  userId: string,
  userName: string,
  content: string
): Promise<string> => {
  try {
    const commentRef = await addDoc(collection(db, 'comments'), {
      artworkId,
      userId,
      userName,
      content,
      createdAt: serverTimestamp()
    });
    
    return commentRef.id;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

// Delete a comment
export const deleteComment = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'comments', id));
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

// Get comments by user ID
export const getCommentsByUser = async (userId: string): Promise<Comment[]> => {
  try {
    const commentsQuery = query(
      collection(db, 'comments'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(commentsQuery);
    return querySnapshot.docs.map(convertComment);
  } catch (error) {
    console.error('Error getting user comments:', error);
    throw error;
  }
};
