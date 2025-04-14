
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ArtworkCard from '@/components/ArtworkCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { getArtworksByArtist, Artwork } from '@/services/artworkService';
import { getUserById, UserProfile } from '@/services/userService';

const ArtistProfile = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const [artist, setArtist] = useState<UserProfile | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchArtistData = async () => {
      if (!artistId) return;
      
      setIsLoading(true);
      try {
        // Fetch artist profile
        const artistProfile = await getUserById(artistId);
        if (artistProfile) {
          setArtist(artistProfile);
        }
        
        // Fetch artist's artworks
        const artistArtworks = await getArtworksByArtist(artistId);
        setArtworks(artistArtworks);
      } catch (error) {
        console.error('Error fetching artist data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArtistData();
  }, [artistId]);
  
  // If artist profile not found, use the first artwork's artist info as a fallback
  useEffect(() => {
    if (!artist && artworks.length > 0) {
      const firstArtwork = artworks[0];
      setArtist({
        uid: firstArtwork.artistId,
        name: firstArtwork.artist,
        email: '',
        role: 'student',
        createdAt: firstArtwork.createdAt
      });
    }
  }, [artist, artworks]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gallery-gray">Loading artist profile...</p>
        </main>
      </div>
    );
  }
  
  if (!artist && !isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gallery-darkGray mb-4">Artist Not Found</h1>
            <p className="text-gallery-gray mb-6">The artist you're looking for does not exist or has been removed.</p>
            <Link to="/gallery">
              <Button className="bg-gallery-purple hover:bg-opacity-90">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Back navigation */}
          <div className="mb-8">
            <Link to="/gallery">
              <Button variant="ghost" className="pl-0 text-gallery-gray hover:text-gallery-purple">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
              </Button>
            </Link>
          </div>
          
          {/* Artist Profile */}
          <div className="mb-10 neumorph p-6 rounded-lg">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 bg-gallery-lightGray rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-gallery-purple">
                  {artist?.name.charAt(0)}
                </span>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gallery-darkGray mb-2">
                  {artist?.name}
                </h1>
                <p className="text-gallery-gray mb-2">Student Artist</p>
                <p className="text-gallery-gray">
                  {artworks.length} {artworks.length === 1 ? 'Artwork' : 'Artworks'} in Gallery
                </p>
              </div>
            </div>
          </div>
          
          {/* Artist's Artworks */}
          <div>
            <h2 className="text-xl font-bold mb-6">Artworks by {artist?.name}</h2>
            
            {artworks.length > 0 ? (
              <div className="artwork-grid">
                {artworks.map(artwork => (
                  <ArtworkCard key={artwork.id} {...artwork} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 neumorph">
                <p className="text-gallery-gray">This artist hasn't uploaded any artworks yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-white py-6 px-4 border-t mt-10">
        <div className="container mx-auto text-center text-gallery-gray">
          <p>© 2025 Virtual Art Gallery for Student Exhibitions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ArtistProfile;
