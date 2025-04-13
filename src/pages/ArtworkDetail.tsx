
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageSquare, Share, Clock, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import ArtworkCard from '@/components/ArtworkCard';

// Mock data for initial UI
const artwork = {
  id: "1",
  title: "Urban Dreamscape",
  artist: "Sophia Chen",
  artistId: "artist1",
  description: "An exploration of the subconscious through an urban landscape, blending reality and imagination. The piece uses vibrant colors and dynamic forms to represent the chaotic yet beautiful nature of city life filtered through a dreamer's mind.\n\nCreated using digital painting techniques in Procreate, this artwork aims to capture the essence of modern urban life while adding a surreal, dreamlike quality that invites viewers to interpret their own meaning.",
  imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  category: "Digital Art",
  createdAt: "2025-03-15",
  likes: 87,
  comments: [
    {
      id: "c1",
      user: "Alex Thompson",
      userId: "user1",
      text: "The colors in this piece are absolutely mesmerizing! I love how you've captured the essence of urban life with such a dreamlike quality.",
      createdAt: "2025-03-17"
    },
    {
      id: "c2",
      user: "Jamie Lee",
      userId: "user2",
      text: "This reminds me of a dream I had once. The way you've blended reality with fantasy is truly impressive.",
      createdAt: "2025-03-16"
    }
  ]
};

const relatedArtworks = [
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
    id: "6",
    title: "Abstract Motion",
    artist: "Devon Park",
    artistId: "artist6",
    imageUrl: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    category: "Digital Art",
    likes: 73
  },
  {
    id: "9",
    title: "Vibrant Still Life",
    artist: "Alex Thompson",
    artistId: "artist9",
    imageUrl: "https://images.unsplash.com/photo-1579541891629-15f88c9d3d1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
    category: "Painting",
    likes: 33
  }
];

const ArtworkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [comment, setComment] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Replace with actual auth state
  
  // In a real app, we would fetch the artwork data based on the ID
  // For now, we'll use our mock data
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would submit the comment to the backend
    console.log('Comment submitted:', comment);
    setComment('');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Artwork Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <div className="neumorph overflow-hidden">
              <img 
                src={artwork.imageUrl} 
                alt={artwork.title} 
                className="w-full h-auto"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl font-bold text-gallery-darkGray">{artwork.title}</h1>
                  <Button variant="ghost" className="flex items-center gap-1 rounded-full">
                    <Heart className="h-5 w-5 text-gallery-purple" />
                    <span>{artwork.likes}</span>
                  </Button>
                </div>
                
                <Link to={`/artist/${artwork.artistId}`} className="text-gallery-purple font-medium hover:underline">
                  {artwork.artist}
                </Link>
              </div>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gallery-gray">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Created on {new Date(artwork.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{artwork.comments.length} Comments</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-3">Description</h3>
                <p className="text-gallery-gray whitespace-pre-line">{artwork.description}</p>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Share className="h-4 w-4" />
                  Share
                </Button>
                <Button className="bg-gallery-purple hover:bg-opacity-90 flex-1">
                  Contact Artist
                </Button>
              </div>
            </div>
          </div>
          
          {/* Comments Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gallery-darkGray mb-6">Comments</h2>
            
            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <Textarea 
                placeholder={isLoggedIn ? "Add your comment..." : "Log in to leave a comment"} 
                className="mb-3 neumorph-inset"
                disabled={!isLoggedIn}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              {isLoggedIn ? (
                <Button type="submit" className="bg-gallery-purple hover:bg-opacity-90">
                  Post Comment
                </Button>
              ) : (
                <Link to="/login">
                  <Button type="button" className="bg-gallery-purple hover:bg-opacity-90">
                    Log In to Comment
                  </Button>
                </Link>
              )}
            </form>
            
            {/* Comments List */}
            <div className="space-y-6">
              {artwork.comments.length > 0 ? (
                artwork.comments.map(comment => (
                  <div key={comment.id} className="neumorph p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-gallery-lightGray rounded-full p-2">
                          <User className="h-4 w-4 text-gallery-gray" />
                        </div>
                        <span className="font-medium">{comment.user}</span>
                      </div>
                      <span className="text-sm text-gallery-gray">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gallery-darkGray">{comment.text}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gallery-gray">
                  <p>No comments yet. Be the first to comment!</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Related Artworks */}
          <div>
            <h2 className="text-2xl font-bold text-gallery-darkGray mb-6">Related Artworks</h2>
            <div className="artwork-grid">
              {relatedArtworks.map(artwork => (
                <ArtworkCard key={artwork.id} {...artwork} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white py-10 px-4 border-t mt-10">
        <div className="container mx-auto text-center text-gallery-gray">
          <p>© 2025 StudentArt Gallery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ArtworkDetail;
