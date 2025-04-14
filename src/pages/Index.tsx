
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Palette, Users, Image, Eye } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FeaturedArtwork from '@/components/FeaturedArtwork';
import ArtworkCard from '@/components/ArtworkCard';
import { useAuth } from '@/contexts/AuthContext';

// Mock data for initial UI
const featuredArtwork = {
  id: "3",
  title: "Study Under the Tree",
  artist: "Aisha Patel",
  artistId: "artist3",
  description: "A stylized digital illustration capturing a peaceful moment of a young woman studying under the shade of a large tree as the sun sets in the background. The warm colors and gentle composition evoke a sense of tranquility and focus amid nature.",
  imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
  category: "Digital Art"
};

const recentArtworks = [
  {
    id: "4",
    title: "Neon Metropolis 2077",
    artist: "James Wilson",
    artistId: "artist4",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    category: "Digital Art",
    likes: 51
  },
  {
    id: "5",
    title: "Corridors of Learning",
    artist: "Elena Rodriguez",
    artistId: "artist5",
    imageUrl: "https://images.unsplash.com/photo-1527576539890-dfa815648363",
    category: "Photography",
    likes: 64
  },
  {
    id: "6",
    title: "Street Vendor at Dusk",
    artist: "Devon Park",
    artistId: "artist6",
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    category: "Photography",
    likes: 73
  }
];

const Index = () => {
  const { currentUser, userRole } = useAuth();
  const isStudent = userRole === 'student';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-16 pb-24 px-4 bg-gradient-to-b from-white to-gallery-lightGray">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gallery-darkGray mb-6">
              Virtual Art Gallery
            </h1>
            <h2 className="text-xl sm:text-2xl text-gallery-purple mb-6">
              For Student Exhibitions
            </h2>
            <p className="text-xl text-gallery-gray mb-10 max-w-2xl mx-auto">
              Discover and celebrate creative works from emerging student artists. A space where talent meets opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/gallery">
                <Button className="bg-gallery-purple hover:bg-opacity-90 text-white px-8 py-6 text-lg rounded-md w-full sm:w-auto">
                  Explore Gallery
                </Button>
              </Link>
              {!currentUser ? (
                <Link to="/register">
                  <Button variant="outline" className="px-8 py-6 text-lg rounded-md w-full sm:w-auto">
                    Join as an Artist
                  </Button>
                </Link>
              ) : isStudent ? (
                <Link to="/upload">
                  <Button variant="outline" className="px-8 py-6 text-lg rounded-md w-full sm:w-auto">
                    Submit Your Art
                  </Button>
                </Link>
              ) : (
                <Link to="/profile">
                  <Button variant="outline" className="px-8 py-6 text-lg rounded-md w-full sm:w-auto">
                    Your Profile
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>
        
        {/* Info Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gallery-darkGray text-center mb-12">
              Where Student Art Gets Noticed
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="neumorph p-6 text-center">
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-gallery-purple bg-opacity-10">
                  <Palette className="h-7 w-7 text-gallery-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">For Artists</h3>
                <p className="text-gallery-gray">
                  Showcase your artwork, receive feedback, and gain recognition in our supportive community of creators.
                </p>
              </div>
              
              <div className="neumorph p-6 text-center">
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-gallery-purple bg-opacity-10">
                  <Eye className="h-7 w-7 text-gallery-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">For Visitors</h3>
                <p className="text-gallery-gray">
                  Discover new talent, explore diverse art styles, and engage with emerging artists through comments.
                </p>
              </div>
              
              <div className="neumorph p-6 text-center">
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-gallery-purple bg-opacity-10">
                  <Users className="h-7 w-7 text-gallery-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">For Educators</h3>
                <p className="text-gallery-gray">
                  Use our platform to showcase student work, organize exhibitions, and foster artistic growth.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Artwork Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-baseline mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gallery-darkGray">Featured Artwork</h2>
              <Link to="/gallery" className="text-gallery-purple font-medium hover:underline flex items-center">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <FeaturedArtwork {...featuredArtwork} />
          </div>
        </section>
        
        {/* Recent Artwork Section */}
        <section className="py-16 px-4 bg-gallery-lightGray">
          <div className="container mx-auto">
            <div className="flex justify-between items-baseline mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gallery-darkGray">Recent Artwork</h2>
              <Link to="/gallery" className="text-gallery-purple font-medium hover:underline flex items-center">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="artwork-grid">
              {recentArtworks.map(artwork => (
                <ArtworkCard key={artwork.id} {...artwork} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-20 px-4 bg-gallery-purple text-white">
          <div className="container mx-auto text-center max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Share Your Artwork?</h2>
            <p className="text-lg mb-10 opacity-90">
              Join our community of student artists and gain exposure for your creative work.
            </p>
            {!currentUser ? (
              <Link to="/register">
                <Button className="bg-white text-gallery-purple hover:bg-opacity-90 px-8 py-6 text-lg rounded-md">
                  Join as an Artist
                </Button>
              </Link>
            ) : isStudent ? (
              <Link to="/upload">
                <Button className="bg-white text-gallery-purple hover:bg-opacity-90 px-8 py-6 text-lg rounded-md">
                  Upload Your Art
                </Button>
              </Link>
            ) : (
              <Link to="/gallery">
                <Button className="bg-white text-gallery-purple hover:bg-opacity-90 px-8 py-6 text-lg rounded-md">
                  Explore the Gallery
                </Button>
              </Link>
            )}
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white py-10 px-4 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-xl font-semibold">Virtual Art Gallery</span>
              <span className="text-sm text-gallery-gray">© 2025</span>
            </div>
            
            <div className="flex space-x-8">
              <Link to="/" className="text-gallery-gray hover:text-gallery-purple">Home</Link>
              <Link to="/gallery" className="text-gallery-gray hover:text-gallery-purple">Gallery</Link>
              <Link to="/register" className="text-gallery-gray hover:text-gallery-purple">Join</Link>
              <Link to="/login" className="text-gallery-gray hover:text-gallery-purple">Login</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
