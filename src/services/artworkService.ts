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

// Mock data for offline testing when Firebase might not be connected
export const mockArtworks: Artwork[] = [
  {
    id: "1",
    title: "Village in the Monsoon",
    artist: "Priya Sharma",
    artistId: "artist1",
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
    category: "Painting",
    description: "A watercolor painting depicting a serene village landscape during the monsoon season. The misty atmosphere and gentle rain create a peaceful mood, showcasing the beauty of rural life during the rainy season.",
    likes: 87,
    createdAt: "2025-01-15"
  },
  {
    id: "2",
    title: "Fruits of Labor",
    artist: "Marcus Johnson",
    artistId: "artist2",
    imageUrl: "https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    category: "Painting",
    description: "An oil painting study of a classic still life arrangement featuring seasonal fruits, a ceramic vase, and elegantly draped cloth. The play of light and shadow demonstrates traditional techniques while bringing a fresh perspective to a timeless subject.",
    likes: 42,
    createdAt: "2025-02-03"
  },
  {
    id: "3",
    title: "Study Under the Tree",
    artist: "Aisha Patel",
    artistId: "artist3",
    imageUrl: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "Digital Art",
    description: "A stylized digital illustration capturing a peaceful moment of a young woman studying under the shade of a large tree as the sun sets in the background. The warm colors and gentle composition evoke a sense of tranquility and focus amid nature.",
    likes: 38,
    createdAt: "2025-03-12"
  },
  {
    id: "4",
    title: "Neon Metropolis 2077",
    artist: "James Wilson",
    artistId: "artist4",
    imageUrl: "https://images.unsplash.com/photo-1520262454473-a1a82276a574?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    category: "Digital Art",
    description: "A vibrant digital artwork depicting a futuristic cityscape bathed in neon lights. Towering skyscrapers, flying vehicles, and holographic advertisements create an immersive sci-fi world inspired by cyberpunk aesthetics.",
    likes: 51,
    createdAt: "2025-01-28"
  },
  {
    id: "5",
    title: "Corridors of Learning",
    artist: "Elena Rodriguez",
    artistId: "artist5",
    imageUrl: "https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    category: "Photography",
    description: "A candid black and white photograph capturing students walking through the architectural corridors of a university building. The interplay of light, shadow, and human movement creates a compelling visual narrative about academic life.",
    likes: 64,
    createdAt: "2025-02-19"
  },
  {
    id: "6",
    title: "Street Vendor at Dusk",
    artist: "Devon Park",
    artistId: "artist6",
    imageUrl: "https://images.unsplash.com/photo-1519075677053-4bcc089df102?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    category: "Photography",
    description: "A high-contrast color photograph capturing the vibrant atmosphere of a street food vendor's stall at dusk. The warm glow of the vendor's lights against the darkening sky creates a dramatic scene filled with color, life, and cultural richness.",
    likes: 73,
    createdAt: "2025-03-05"
  }
];

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
    // Return mock data as fallback
    return mockArtworks;
  }
};

// Get artwork by ID
export const getArtworkById = async (id: string): Promise<Artwork | null> => {
  try {
    // First check in mock data (for development/offline mode)
    const mockArtwork = mockArtworks.find(artwork => artwork.id === id);
    if (mockArtwork) {
      console.log('Using mock artwork data for id:', id);
      return mockArtwork;
    }
    
    // Otherwise try to get from Firestore
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
    // Return mock data as fallback (if available)
    const mockArtwork = mockArtworks.find(artwork => artwork.id === id);
    return mockArtwork || null;
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
