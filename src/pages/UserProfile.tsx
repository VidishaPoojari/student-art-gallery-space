
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ArtworkCard from '@/components/ArtworkCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { getArtworksByArtist } from '@/services/artworkService';
import { Artwork } from '@/services/artworkService';
import { getUserById } from '@/services/userService';
import { seedFirebaseData } from '@/services/seedFirebaseData';
import { toast } from '@/components/ui/use-toast';
import { Database } from 'lucide-react';

const UserProfile = () => {
  const { currentUser, userRole } = useAuth();
  const [userArtworks, setUserArtworks] = useState<Artwork[]>([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          // Fetch user profile data
          const userProfile = await getUserById(currentUser.uid);
          if (userProfile) {
            setUserName(userProfile.name);
          }
          
          // If user is a student artist, fetch their artworks
          if (userRole === 'student') {
            const artworks = await getArtworksByArtist(currentUser.uid);
            setUserArtworks(artworks);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchUserData();
  }, [currentUser, userRole]);
  
  const handleSeedData = async () => {
    setSeeding(true);
    try {
      const result = await seedFirebaseData();
      if (result.success) {
        toast({
          title: "Data Seeding Complete",
          description: "Mock artworks and comments have been added to Firebase",
          variant: "default",
        });
      } else {
        toast({
          title: "Data Seeding Issue",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error seeding data:', error);
      toast({
        title: "Error",
        description: "Failed to seed data to Firebase",
        variant: "destructive",
      });
    } finally {
      setSeeding(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading profile...</p>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-10 p-6 neumorph rounded-lg">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 bg-gallery-lightGray rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-gallery-purple">
                  {userName.charAt(0)}
                </span>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold text-gallery-darkGray">{userName}</h1>
                <p className="text-gallery-gray mb-4">
                  Role: {userRole === 'student' ? 'Student Artist' : 'Visitor'}
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {userRole === 'student' && (
                    <Link to="/upload">
                      <Button className="bg-gallery-purple hover:bg-opacity-90">
                        Upload New Artwork
                      </Button>
                    </Link>
                  )}
                  
                  <Button 
                    onClick={handleSeedData} 
                    disabled={seeding}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Database className="h-4 w-4" />
                    {seeding ? 'Adding to Firebase...' : 'Add Mock Data to Firebase'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {userRole === 'student' && (
            <div className="mt-10">
              <h2 className="text-xl font-bold mb-6">My Artworks</h2>
              
              {userArtworks.length > 0 ? (
                <div className="artwork-grid">
                  {userArtworks.map(artwork => (
                    <ArtworkCard key={artwork.id} {...artwork} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 neumorph">
                  <p className="text-gallery-gray mb-4">You haven't uploaded any artworks yet.</p>
                  <Link to="/upload">
                    <Button className="bg-gallery-purple hover:bg-opacity-90">
                      Upload Your First Artwork
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
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

export default UserProfile;
