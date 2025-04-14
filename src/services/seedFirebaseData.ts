
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { mockArtworks } from '@/services/artworkService';
import { Comment } from '@/services/commentService';

// Mock comments for seeding
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
  },
  {
    id: "4",
    artworkId: "1",
    userId: "user1",
    userName: "John Doe",
    content: "The use of colors in this painting creates such a peaceful mood. I love it!",
    createdAt: new Date(2025, 3, 2).toISOString()
  },
  {
    id: "5",
    artworkId: "2",
    userId: "user2",
    userName: "Sarah Johnson",
    content: "Traditional still life with a modern twist. The lighting is particularly impressive.",
    createdAt: new Date(2025, 3, 1).toISOString()
  }
];

// Function to seed artworks
export const seedArtworks = async () => {
  try {
    console.log('Seeding artworks...');
    const artworksCollection = collection(db, 'artworks');
    
    for (const artwork of mockArtworks) {
      // Check if artwork already exists to prevent duplicates
      const artworkDoc = await getDoc(doc(artworksCollection, artwork.id));
      
      if (!artworkDoc.exists()) {
        const artworkData = {
          title: artwork.title,
          description: artwork.description,
          category: artwork.category,
          imageUrl: artwork.imageUrl,
          artistId: artwork.artistId,
          artist: artwork.artist,
          createdAt: new Date(artwork.createdAt),
          likes: artwork.likes
        };
        
        await setDoc(doc(artworksCollection, artwork.id), artworkData);
        console.log(`Added artwork: ${artwork.title}`);
      } else {
        console.log(`Artwork already exists: ${artwork.title}`);
      }
    }
    console.log('Artworks seeding complete!');
    return true;
  } catch (error) {
    console.error('Error seeding artworks:', error);
    return false;
  }
};

// Function to seed comments
export const seedComments = async () => {
  try {
    console.log('Seeding comments...');
    const commentsCollection = collection(db, 'comments');
    
    for (const comment of mockComments) {
      // Check if comment already exists to prevent duplicates
      const commentDoc = await getDoc(doc(commentsCollection, comment.id));
      
      if (!commentDoc.exists()) {
        const commentData = {
          artworkId: comment.artworkId,
          userId: comment.userId,
          userName: comment.userName,
          content: comment.content,
          createdAt: new Date(comment.createdAt)
        };
        
        await setDoc(doc(commentsCollection, comment.id), commentData);
        console.log(`Added comment by ${comment.userName}`);
      } else {
        console.log(`Comment already exists: ${comment.id}`);
      }
    }
    console.log('Comments seeding complete!');
    return true;
  } catch (error) {
    console.error('Error seeding comments:', error);
    return false;
  }
};

// Main function to seed all data
export const seedFirebaseData = async () => {
  try {
    const artworksSeeded = await seedArtworks();
    const commentsSeeded = await seedComments();
    
    return {
      success: artworksSeeded && commentsSeeded,
      message: 'Firebase data seeding complete!'
    };
  } catch (error) {
    console.error('Error seeding Firebase data:', error);
    return {
      success: false,
      message: `Error seeding data: ${error}`
    };
  }
};
