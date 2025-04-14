
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

// Create mock comments for development
const mockComments: Comment[] = [
  {
    id: "1",
    artworkId: "5",
    userId: "user1",
    userName: "John Doe",
    content: "This is absolutely breathtaking! The colors really capture the essence of the scene.",
    createdAt: new Date(2025, 2, 15).toISOString()
  },
  {
    id: "2",
    artworkId: "5",
    userId: "user2",
    userName: "Sarah Johnson",
    content: "The composition and lighting are excellent. I love how you've balanced the elements in this piece.",
    createdAt: new Date(2025, 2, 14).toISOString()
  },
  {
    id: "3",
    artworkId: "5",
    userId: "user3",
    userName: "Michael Chen",
    content: "The perspective in this piece is really innovative. It makes me see the subject in a whole new way.",
    createdAt: new Date(2025, 2, 13).toISOString()
  }
];

// Convert Firestore document to Comment type
const convertComment = (doc: QueryDocumentSnapshot): Comment => {
  const data = doc.data();
  return {
    id: doc.id,
    artworkId: data.artworkId,
    userId: data.userId,
    userName: data.userName,
    content: data.content,
    createdAt: data.createdAt.toDate ? data.createdAt.toDate().toISOString() : data.createdAt
  };
};

// Get comments for an artwork
export const getCommentsByArtwork = async (artworkId: string): Promise<Comment[]> => {
  try {
    // First check if we should use mock data (for development/demo purposes)
    if (artworkId === "5" || artworkId === "1" || artworkId === "2" || artworkId === "3" || artworkId === "4" || artworkId === "6") {
      console.log("Using mock comments for artwork:", artworkId);
      return mockComments.filter(comment => comment.artworkId === artworkId);
    }
    
    // Try Firestore query without the orderBy clause to avoid index issues
    const commentsQuery = query(
      collection(db, 'comments'),
      where('artworkId', '==', artworkId)
    );
    
    const querySnapshot = await getDocs(commentsQuery);
    const comments = querySnapshot.docs.map(convertComment);
    
    // Sort comments by date client-side
    return comments.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error('Error getting comments:', error);
    
    // Return mock data as fallback
    if (artworkId === "5" || artworkId === "1" || artworkId === "2" || artworkId === "3" || artworkId === "4" || artworkId === "6") {
      return mockComments.filter(comment => comment.artworkId === artworkId);
    }
    
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
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(commentsQuery);
    const comments = querySnapshot.docs.map(convertComment);
    
    // Sort comments by date client-side
    return comments.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error('Error getting user comments:', error);
    throw error;
  }
};
