
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ArtworkCard from '@/components/ArtworkCard';
import { User, Image, Calendar } from 'lucide-react';

// Mock artist data
const artists = {
  artist1: {
    id: "artist1",
    name: "Priya Sharma",
    bio: "A watercolor artist specializing in landscapes, currently in her final year of Fine Arts program.",
    joinedDate: "2024-09-15",
    avatarUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  artist2: {
    id: "artist2",
    name: "Marcus Johnson",
    bio: "Traditional oil painter with a focus on still life compositions, studying at the Academy of Fine Arts.",
    joinedDate: "2023-11-30",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  artist3: {
    id: "artist3",
    name: "Aisha Patel",
    bio: "Digital artist passionate about storytelling through illustration, currently pursuing a degree in Digital Media Arts.",
    joinedDate: "2024-02-14",
    avatarUrl: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=389&q=80",
  },
  artist4: {
    id: "artist4",
    name: "James Wilson",
    bio: "Specializing in futuristic digital landscapes and sci-fi concept art, currently interning at a game design studio.",
    joinedDate: "2024-01-05",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  artist5: {
    id: "artist5",
    name: "Elena Rodriguez",
    bio: "Black and white photographer documenting student life and architecture, pursuing Photography at the Institute of Visual Arts.",
    joinedDate: "2023-08-22",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=461&q=80",
  },
  artist6: {
    id: "artist6",
    name: "Devon Park",
    bio: "Street photographer capturing everyday moments with a focus on color and contrast, studying Documentary Photography.",
    joinedDate: "2024-03-10",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  }
};

// Mock artwork data reusing from gallery
const allArtworks = [
  {
    id: "1",
    title: "Village in the Monsoon",
    artist: "Priya Sharma",
    artistId: "artist1",
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
    category: "Painting",
    likes: 87,
    createdAt: "2025-01-15"
  },
  {
    id: "7",
    title: "Mountain Stream",
    artist: "Priya Sharma",
    artistId: "artist1",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80",
    category: "Painting",
    likes: 45,
    createdAt: "2025-02-28"
  },
  {
    id: "2",
    title: "Fruits of Labor",
    artist: "Marcus Johnson",
    artistId: "artist2",
    imageUrl: "https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    category: "Painting",
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
    likes: 38,
    createdAt: "2025-03-12"
  },
  {
    id: "8",
    title: "Fantasy Landscape",
    artist: "Aisha Patel",
    artistId: "artist3",
    imageUrl: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    category: "Digital Art",
    likes: 29,
    createdAt: "2025-03-28"
  },
  {
    id: "4",
    title: "Neon Metropolis 2077",
    artist: "James Wilson",
    artistId: "artist4",
    imageUrl: "https://images.unsplash.com/photo-1520262454473-a1a82276a574?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    category: "Digital Art",
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
    likes: 64,
    createdAt: "2025-02-19"
  },
  {
    id: "9",
    title: "Shadows and Light",
    artist: "Elena Rodriguez",
    artistId: "artist5",
    imageUrl: "https://images.unsplash.com/photo-1547366868-f5d6fab0440f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    category: "Photography",
    likes: 33,
    createdAt: "2025-03-15"
  },
  {
    id: "6",
    title: "Street Vendor at Dusk",
    artist: "Devon Park",
    artistId: "artist6",
    imageUrl: "https://images.unsplash.com/photo-1519075677053-4bcc089df102?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    category: "Photography",
    likes: 73,
    createdAt: "2025-03-05"
  }
];

const ArtistProfile = () => {
  const { artistId } = useParams<{ artistId: string }>();
  
  // Find artist by ID from the mock data
  const artist = artistId ? artists[artistId as keyof typeof artists] : null;
  
  // Filter artworks by artist ID
  const artistArtworks = allArtworks.filter(artwork => artwork.artistId === artistId);
  
  // Format joined date
  const formattedJoinedDate = artist?.joinedDate 
    ? new Date(artist.joinedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';
  
  // If artist not found
  if (!artist) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Artist Not Found</h1>
            <p className="text-gallery-gray">The artist you're looking for doesn't exist or has been removed.</p>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-10 px-4">
        <div className="container mx-auto">
          {/* Artist Profile Header */}
          <div className="mb-12 p-6 neumorph rounded-lg">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 bg-gallery-lightGray">
                <img 
                  src={artist.avatarUrl} 
                  alt={artist.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';
                  }}
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-gallery-darkGray mb-2">
                  {artist.name}
                </h1>
                
                <div className="flex flex-col sm:flex-row gap-3 mb-4 justify-center md:justify-start">
                  <div className="flex items-center gap-1 text-sm text-gallery-gray">
                    <Image className="h-4 w-4" /> 
                    <span>{artistArtworks.length} Artworks</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gallery-gray">
                    <Calendar className="h-4 w-4" /> 
                    <span>Joined {formattedJoinedDate}</span>
                  </div>
                </div>
                
                <p className="text-gallery-gray max-w-2xl">
                  {artist.bio}
                </p>
              </div>
            </div>
          </div>
          
          {/* Artist's Artworks */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gallery-darkGray mb-6">
              Artworks by {artist.name}
            </h2>
            
            {artistArtworks.length > 0 ? (
              <div className="artwork-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {artistArtworks.map(artwork => (
                  <ArtworkCard key={artwork.id} {...artwork} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border rounded-lg bg-white">
                <User className="h-12 w-12 mx-auto text-gallery-gray mb-4" />
                <h3 className="text-xl font-medium mb-2">No artworks yet</h3>
                <p className="text-gallery-gray">This artist hasn't uploaded any artworks yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-white py-6 px-4 border-t">
        <div className="container mx-auto text-center text-gallery-gray">
          <p>© 2025 StudentArt Gallery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ArtistProfile;
