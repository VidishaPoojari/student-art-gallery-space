
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  Timestamp,
  serverTimestamp,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

export interface Artwork {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  artistId: string;
  artist: string;
  createdAt: string;
  likes: number;
}

// Convert Firestore document to Artwork type
const convertArtwork = (doc: QueryDocumentSnapshot): Artwork => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    description: data.description,
    category: data.category,
    imageUrl: data.imageUrl,
    artistId: data.artistId,
    artist: data.artist,
    createdAt: data.createdAt.toDate().toISOString(),
    likes: data.likes || 0
  };
};

// Get all artworks
export const getArtworks = async (): Promise<Artwork[]> => {
  try {
    const artworksQuery = query(
      collection(db, 'artworks'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(artworksQuery);
    return querySnapshot.docs.map(convertArtwork);
  } catch (error) {
    console.error('Error getting artworks:', error);
    throw error;
  }
};

// Get artwork by ID
export const getArtworkById = async (id: string): Promise<Artwork | null> => {
  try {
    const docRef = doc(db, 'artworks', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title,
        description: data.description,
        category: data.category,
        imageUrl: data.imageUrl,
        artistId: data.artistId,
        artist: data.artist,
        createdAt: data.createdAt.toDate().toISOString(),
        likes: data.likes || 0
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting artwork:', error);
    throw error;
  }
};

// Get artworks by artist ID
export const getArtworksByArtist = async (artistId: string): Promise<Artwork[]> => {
  try {
    const artworksQuery = query(
      collection(db, 'artworks'),
      where('artistId', '==', artistId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(artworksQuery);
    return querySnapshot.docs.map(convertArtwork);
  } catch (error) {
    console.error('Error getting artist artworks:', error);
    throw error;
  }
};

// Create a new artwork
export const createArtwork = async (
  artwork: { title: string; description: string; category: string; },
  image: File,
  userId: string,
  artistName: string
): Promise<string> => {
  try {
    // Upload image to Firebase Storage
    const storageRef = ref(storage, `artworks/${userId}/${Date.now()}_${image.name}`);
    const uploadResult = await uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(uploadResult.ref);
    
    // Add artwork document to Firestore
    const artworkRef = await addDoc(collection(db, 'artworks'), {
      ...artwork,
      imageUrl,
      artistId: userId,
      artist: artistName,
      createdAt: serverTimestamp(),
      likes: 0
    });
    
    return artworkRef.id;
  } catch (error) {
    console.error('Error creating artwork:', error);
    throw error;
  }
};

// Update an artwork
export const updateArtwork = async (
  id: string,
  artwork: { title?: string; description?: string; category?: string; }
): Promise<void> => {
  try {
    const artworkRef = doc(db, 'artworks', id);
    await updateDoc(artworkRef, {
      ...artwork,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating artwork:', error);
    throw error;
  }
};

// Delete an artwork
export const deleteArtwork = async (id: string): Promise<void> => {
  try {
    // Get artwork data to access image URL for deletion
    const artworkRef = doc(db, 'artworks', id);
    const artworkSnap = await getDoc(artworkRef);
    
    if (artworkSnap.exists()) {
      const data = artworkSnap.data();
      
      // Delete image from Storage if it exists
      if (data.imageUrl) {
        try {
          const imageRef = ref(storage, data.imageUrl);
          await deleteObject(imageRef);
        } catch (storageError) {
          console.error('Error deleting image from storage:', storageError);
          // Continue with document deletion even if image deletion fails
        }
      }
      
      // Delete artwork document from Firestore
      await deleteDoc(artworkRef);
    }
  } catch (error) {
    console.error('Error deleting artwork:', error);
    throw error;
  }
};

// Like an artwork
export const likeArtwork = async (id: string): Promise<void> => {
  try {
    const artworkRef = doc(db, 'artworks', id);
    const artworkSnap = await getDoc(artworkRef);
    
    if (artworkSnap.exists()) {
      const data = artworkSnap.data();
      await updateDoc(artworkRef, {
        likes: (data.likes || 0) + 1
      });
    }
  } catch (error) {
    console.error('Error liking artwork:', error);
    throw error;
  }
};

// Unlike an artwork
export const unlikeArtwork = async (id: string): Promise<void> => {
  try {
    const artworkRef = doc(db, 'artworks', id);
    const artworkSnap = await getDoc(artworkRef);
    
    if (artworkSnap.exists()) {
      const data = artworkSnap.data();
      await updateDoc(artworkRef, {
        likes: Math.max((data.likes || 0) - 1, 0) // Ensure likes don't go below 0
      });
    }
  } catch (error) {
    console.error('Error unliking artwork:', error);
    throw error;
  }
};

// Get artworks by search term
export const searchArtworks = async (searchTerm: string): Promise<Artwork[]> => {
  try {
    // Due to Firestore limitations on text search, we'll get all artworks
    // and filter them on the client side
    const allArtworks = await getArtworks();
    
    // Return filtered artworks based on title or artist name
    return allArtworks.filter(artwork => 
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching artworks:', error);
    throw error;
  }
};

// Get artworks by category
export const getArtworksByCategory = async (category: string): Promise<Artwork[]> => {
  try {
    const artworksQuery = query(
      collection(db, 'artworks'),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(artworksQuery);
    return querySnapshot.docs.map(convertArtwork);
  } catch (error) {
    console.error('Error getting artworks by category:', error);
    throw error;
  }
};
