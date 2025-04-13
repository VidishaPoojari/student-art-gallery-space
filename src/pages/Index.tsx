
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FeaturedArtwork from '@/components/FeaturedArtwork';
import ArtworkCard from '@/components/ArtworkCard';

// Mock data for initial UI
const featuredArtwork = {
  id: "1",
  title: "Urban Dreamscape",
  artist: "Sophia Chen",
  artistId: "artist1",
  description: "An exploration of the subconscious through an urban landscape, blending reality and imagination. The piece uses vibrant colors and dynamic forms to represent the chaotic yet beautiful nature of city life filtered through a dreamer's mind.",
  imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  category: "Digital Art"
};

const recentArtworks = [
  {
    id: "2",
    title: "Serenity in Blue",
    artist: "Marcus Johnson",
    artistId: "artist2",
    imageUrl: "https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
    category: "Painting",
    likes: 42
  },
  {
    id: "3",
    title: "Geometric Harmony",
    artist: "Aisha Patel",
    artistId: "artist3",
    imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
    category: "Digital Art",
    likes: 38
  },
  {
    id: "4",
    title: "Tranquil Sunset",
    artist: "James Wilson",
    artistId: "artist4",
    imageUrl: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    category: "Photography",
    likes: 51
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-16 pb-24 px-4 bg-gradient-to-b from-white to-gallery-lightGray">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gallery-darkGray mb-6">
              Student Art Gallery
            </h1>
            <p className="text-xl text-gallery-gray mb-10 max-w-2xl mx-auto">
              Discover and celebrate creative works from emerging student artists. A space where talent meets opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/gallery">
                <Button className="bg-gallery-purple hover:bg-opacity-90 text-white px-8 py-6 text-lg rounded-md w-full sm:w-auto">
                  Explore Gallery
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="px-8 py-6 text-lg rounded-md w-full sm:w-auto">
                  Submit Your Art
                </Button>
              </Link>
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
            <Link to="/register">
              <Button className="bg-white text-gallery-purple hover:bg-opacity-90 px-8 py-6 text-lg rounded-md">
                Join as an Artist
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white py-10 px-4 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-xl font-semibold">StudentArt</span>
              <span className="text-sm text-gallery-gray">© 2025</span>
            </div>
            
            <div className="flex space-x-8">
              <Link to="/" className="text-gallery-gray hover:text-gallery-purple">Home</Link>
              <Link to="/gallery" className="text-gallery-gray hover:text-gallery-purple">Gallery</Link>
              <Link to="#" className="text-gallery-gray hover:text-gallery-purple">About</Link>
              <Link to="/login" className="text-gallery-gray hover:text-gallery-purple">Login</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
