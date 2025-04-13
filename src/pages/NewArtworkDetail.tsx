
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import CommentSection from '@/components/CommentSection';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
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

// Mock artwork data - this can be moved to a central data file
const artworks = [
  {
    id: "1",
    title: "Village in the Monsoon",
    artist: "Priya Sharma",
    artistId: "artist1",
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
    category: "Painting",
    description: "A watercolor painting depicting a serene village landscape during the monsoon season. The misty atmosphere and gentle rain create a peaceful mood, showcasing the beauty of rural life during the rainy season.",
    likes: 87,
    createdAt: "2025-01-15",
    createdBy: "student1"
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
    createdAt: "2025-02-03",
    createdBy: "student2"
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
    createdAt: "2025-03-12",
    createdBy: "student3"
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
    createdAt: "2025-01-28",
    createdBy: "student4"
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
    createdAt: "2025-02-19",
    createdBy: "student5"
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
    createdAt: "2025-03-05",
    createdBy: "student6"
  }
];

const NewArtworkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  
  // In a real app, these would come from authentication context
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userId = localStorage.getItem('userId') || '';
  const userRole = localStorage.getItem('userRole');
  const isOwner = userRole === 'owner';
  
  useEffect(() => {
    // In a real app, this would fetch from Firebase/Supabase
    // Simulating API call with setTimeout
    setIsLoading(true);
    const timer = setTimeout(() => {
      const foundArtwork = artworks.find(artwork => artwork.id === id);
      
      if (foundArtwork) {
        setArtwork(foundArtwork);
        setLikeCount(foundArtwork.likes);
      }
      
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
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
  const handleLike = () => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please log in to like artworks",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    // Toggle like state
    if (isLiked) {
      setLikeCount(prev => prev - 1);
      setIsLiked(false);
      toast({
        title: "Unliked",
        description: `You've removed your like from "${artwork.title}"`,
      });
    } else {
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
      toast({
        title: "Liked!",
        description: `You've liked "${artwork.title}" by ${artwork.artist}`,
      });
    }
  };
  
  // Handle share button click
  const handleShare = () => {
    // In a real app, this would use the Web Share API or copy to clipboard
    navigator.clipboard.writeText(window.location.href);
    
    toast({
      title: "Link Copied!",
      description: "Artwork link copied to clipboard",
    });
  };
  
  // Handle delete artwork
  const handleDeleteArtwork = () => {
    // In a real app, this would delete from Firebase/Supabase
    toast({
      title: "Artwork Deleted",
      description: "The artwork has been removed from the gallery",
    });
    
    navigate('/gallery');
  };
  
  // Check if current user is the artwork creator
  const isCreator = userId === artwork?.createdBy;
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavbarWithAuth />
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
        <NavbarWithAuth />
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
      <NavbarWithAuth />
      
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
                  
                  {/* Delete button (for artwork creator or owner/admin) */}
                  {(isCreator || isOwner) && (
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
          <p>© 2025 StudentArt Gallery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default NewArtworkDetail;
