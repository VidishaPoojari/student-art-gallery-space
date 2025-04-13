
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, User } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';

interface ArtworkCardProps {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  imageUrl: string;
  category: string;
  likes?: number;
  createdAt?: string;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({
  id,
  title,
  artist,
  artistId,
  imageUrl,
  category,
  likes = 0,
  createdAt
}) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if user is logged in (this would connect to auth state in a real app)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please log in to like artworks",
        variant: "destructive",
      });
      return;
    }
    
    // Toggle like state
    if (isLiked) {
      setLikeCount(prev => prev - 1);
      setIsLiked(false);
      toast({
        title: "Unliked",
        description: `You've removed your like from "${title}"`,
        variant: "default",
      });
    } else {
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
      toast({
        title: "Liked!",
        description: `You've liked "${title}" by ${artist}`,
        variant: "default",
      });
    }
    
    // In a real app, we would call an API to update the like in the database
    console.log(`${isLiked ? 'Unlike' : 'Like'} artwork: ${id}`);
  };
  
  // Format date for display
  const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) : '';
  
  return (
    <Card className="artwork-card overflow-hidden rounded-lg bg-white transition-all duration-300 hover:shadow-lg">
      <Link to={`/artwork/${id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite error loop
              target.src = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
            }}
          />
          <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium text-gallery-darkGray">
            {category}
          </div>
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link to={`/artwork/${id}`}>
          <h3 className="text-lg font-medium leading-tight mb-1 hover:text-gallery-purple transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>
        
        <Link to={`/artist/${artistId}`} className="text-sm text-gallery-gray hover:text-gallery-purple transition-colors flex items-center gap-1">
          <User className="h-3 w-3" /> {artist}
        </Link>
        
        {formattedDate && (
          <div className="text-xs text-gallery-gray mt-1 flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {formattedDate}
          </div>
        )}
        
        <div className="mt-3 flex items-center justify-between">
          <button 
            onClick={handleLike}
            className="flex items-center gap-1 text-sm text-gallery-gray hover:text-gallery-purple transition-colors"
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-gallery-purple text-gallery-purple' : ''}`} />
            <span>{likeCount}</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtworkCard;
