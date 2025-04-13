
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

interface ArtworkCardProps {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  imageUrl: string;
  category: string;
  likes?: number;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({
  id,
  title,
  artist,
  artistId,
  imageUrl,
  category,
  likes = 0
}) => {
  return (
    <div className="artwork-card overflow-hidden rounded-lg bg-white">
      <Link to={`/artwork/${id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium text-gallery-darkGray">
            {category}
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/artwork/${id}`}>
          <h3 className="text-lg font-medium leading-tight mb-1 hover:text-gallery-purple transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>
        
        <Link to={`/artist/${artistId}`} className="text-sm text-gallery-gray hover:text-gallery-purple transition-colors">
          by {artist}
        </Link>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-gallery-gray">
            <Heart className="h-4 w-4" />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
