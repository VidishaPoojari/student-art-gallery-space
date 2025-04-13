
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FeaturedArtworkProps {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  description: string;
  imageUrl: string;
  category: string;
}

const FeaturedArtwork: React.FC<FeaturedArtworkProps> = ({
  id,
  title,
  artist,
  artistId,
  description,
  imageUrl,
  category
}) => {
  return (
    <div className="neumorph overflow-hidden bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="h-64 md:h-auto">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6 md:p-8 flex flex-col">
          <div className="flex-1">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gallery-lightGray text-gallery-darkGray mb-3">
              {category}
            </span>
            
            <h2 className="text-2xl font-bold leading-tight mb-2">{title}</h2>
            
            <Link to={`/artist/${artistId}`} className="text-sm text-gallery-gray hover:text-gallery-purple transition-colors mb-4 inline-block">
              by {artist}
            </Link>
            
            <p className="text-gallery-gray line-clamp-3 mb-6">
              {description}
            </p>
          </div>
          
          <Link to={`/artwork/${id}`}>
            <Button className="bg-gallery-purple hover:bg-opacity-90 w-full sm:w-auto flex items-center justify-center gap-2">
              View Artwork
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArtwork;
