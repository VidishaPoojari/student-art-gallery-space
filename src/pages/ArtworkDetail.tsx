
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CommentSection from '@/components/CommentSection';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  getArtworkById, 
  likeArtwork, 
  unlikeArtwork, 
  deleteArtwork,
  Artwork 
} from '@/services/artworkService';
import { 
  Heart, 
  Share, 
  Trash2, 
  Edit, 
  User, 
  Calendar, 
  Tag,
  ArrowLeft
} from 'lucide-react';

const ArtworkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser, userRole } = useAuth();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  
  useEffect(() => {
    const fetchArtwork = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        console.log("Fetching artwork with ID:", id);
        const fetchedArtwork = await getArtworkById(id);
        console.log("Fetched artwork:", fetchedArtwork);
        
        if (fetchedArtwork) {
          setArtwork(fetchedArtwork);
          setLikeCount(fetchedArtwork.likes);
        } else {
          console.log("No artwork found with ID:", id);
        }
      } catch (error) {
        console.error('Error fetching artwork:', error);
        toast({
          title: "Error",
          description: "Failed to load artwork details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArtwork();
  }, [id]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Handle like button click
  const handleLike = async () => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to like artworks",
        variant: "destructive",
      });
      return;
    }
    
    if (!artwork) return;
    
    try {
      // Toggle like state
      if (isLiked) {
        await unlikeArtwork(artwork.id);
        setLikeCount(prev => prev - 1);
        setIsLiked(false);
        toast({
          title: "Unliked",
          description: `You've removed your like from "${artwork.title}"`,
        });
      } else {
        await likeArtwork(artwork.id);
        setLikeCount(prev => prev + 1);
        setIsLiked(true);
        toast({
          title: "Liked!",
          description: `You've liked "${artwork.title}" by ${artwork.artist}`,
        });
      }
    } catch (error) {
      console.error('Error handling like:', error);
      toast({
        title: "Error",
        description: "Failed to process your like",
        variant: "destructive",
      });
    }
  };
  
  // Handle share button click
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    
    toast({
      title: "Link Copied!",
      description: "Artwork link copied to clipboard",
    });
  };
  
  // Handle delete artwork
  const handleDeleteArtwork = async () => {
    if (!artwork) return;
    
    try {
      await deleteArtwork(artwork.id);
      
      toast({
        title: "Artwork Deleted",
        description: "The artwork has been removed from the gallery",
      });
      
      navigate('/gallery');
    } catch (error) {
      console.error('Error deleting artwork:', error);
      toast({
        title: "Error",
        description: "Failed to delete the artwork",
        variant: "destructive",
      });
    }
  };
  
  // Check if current user is the artwork creator
  const isCreator = currentUser && artwork && currentUser.uid === artwork.artistId;
  const canModerate = isCreator;
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gallery-gray">Loading artwork...</p>
          </div>
        </main>
      </div>
    );
  }
  
  // Show not found state
  if (!artwork) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Artwork Not Found</h1>
            <p className="text-gallery-gray mb-6">The artwork you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/gallery')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
            </Button>
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
          {/* Back button */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="pl-0 text-gallery-gray hover:text-gallery-purple"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
            </Button>
          </div>
          
          {/* Artwork display */}
          <div className="mb-10 neumorph p-6 rounded-lg bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Artwork Image */}
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={artwork.imageUrl} 
                  alt={artwork.title}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
                  }}
                />
              </div>
              
              {/* Artwork Details */}
              <div className="flex flex-col">
                <h1 className="text-2xl sm:text-3xl font-bold text-gallery-darkGray mb-2">
                  {artwork.title}
                </h1>
                
                <Link to={`/artist/${artwork.artistId}`} className="text-gallery-purple hover:underline mb-4 flex items-center gap-1">
                  <User className="h-4 w-4" /> {artwork.artist}
                </Link>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-1 text-sm text-gallery-gray bg-gallery-lightGray px-3 py-1 rounded-full">
                    <Tag className="h-4 w-4" /> {artwork.category}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gallery-gray bg-gallery-lightGray px-3 py-1 rounded-full">
                    <Calendar className="h-4 w-4" /> {formatDate(artwork.createdAt)}
                  </div>
                </div>
                
                <p className="text-gallery-gray mb-8 flex-grow">
                  {artwork.description}
                </p>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-auto">
                  <Button 
                    variant="outline" 
                    className={`flex items-center gap-2 ${isLiked ? 'text-gallery-purple' : ''}`}
                    onClick={handleLike}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-gallery-purple' : ''}`} />
                    {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={handleShare}
                  >
                    <Share className="h-4 w-4" />
                    Share
                  </Button>
                  
                  {/* Edit button (only for artwork creator) */}
                  {isCreator && (
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 text-amber-600"
                      onClick={() => navigate(`/edit-artwork/${artwork.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  )}
                  
                  {/* Delete button (for artwork creator only) */}
                  {isCreator && (
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 text-red-600"
                      onClick={handleDeleteArtwork}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Comments Section */}
          <CommentSection artworkId={artwork.id} />
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

export default ArtworkDetail;
