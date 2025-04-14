
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ArtworkCard from '@/components/ArtworkCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Calendar } from 'lucide-react';
import { getArtworks, Artwork } from '@/services/artworkService';

const Gallery = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [dateSort, setDateSort] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch artworks from Firestore
  useEffect(() => {
    const fetchArtworks = async () => {
      setIsLoading(true);
      try {
        const fetchedArtworks = await getArtworks();
        
        // If no artworks are returned, use the predefined mock data
        if (fetchedArtworks.length === 0) {
          setArtworks(getDefaultArtworks());
        } else {
          setArtworks(fetchedArtworks);
        }
      } catch (error) {
        console.error('Error fetching artworks:', error);
        // Use default artworks if fetch fails
        setArtworks(getDefaultArtworks());
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArtworks();
  }, []);
  
  // Filter and sort artworks when filters or artworks change
  useEffect(() => {
    if (artworks.length === 0) return;
    
    let result = [...artworks];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(artwork => {
        return (
          artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          artwork.artist.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    
    // Apply category filter
    if (category !== 'all') {
      result = result.filter(artwork => artwork.category === category);
    }
    
    // Apply date sort
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      
      if (dateSort === 'newest') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
    
    setFilteredArtworks(result);
  }, [artworks, searchTerm, category, dateSort]);
  
  // Function to generate default artworks if no data exists
  const getDefaultArtworks = (): Artwork[] => {
    return [
      {
        id: "1",
        title: "Village in the Monsoon",
        artist: "Priya Sharma",
        artistId: "artist1",
        imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
        category: "Painting",
        description: "A watercolor painting depicting a serene village landscape during the monsoon season. The misty atmosphere and gentle rain create a peaceful mood, showcasing the beauty of rural life during the rainy season.",
        likes: 87,
        createdAt: "2025-01-15"
      },
      {
        id: "2",
        title: "Fruits of Labor",
        artist: "Marcus Johnson",
        artistId: "artist2",
        imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
        category: "Painting",
        description: "An oil painting study of a classic still life arrangement featuring seasonal fruits, a ceramic vase, and elegantly draped cloth. The play of light and shadow demonstrates traditional techniques while bringing a fresh perspective to a timeless subject.",
        likes: 42,
        createdAt: "2025-02-03"
      },
      {
        id: "3",
        title: "Study Under the Tree",
        artist: "Aisha Patel",
        artistId: "artist3",
        imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
        category: "Digital Art",
        description: "A stylized digital illustration capturing a peaceful moment of a young woman studying under the shade of a large tree as the sun sets in the background. The warm colors and gentle composition evoke a sense of tranquility and focus amid nature.",
        likes: 38,
        createdAt: "2025-03-12"
      },
      {
        id: "4",
        title: "Neon Metropolis 2077",
        artist: "James Wilson",
        artistId: "artist4",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
        category: "Digital Art",
        description: "A vibrant digital artwork depicting a futuristic cityscape bathed in neon lights. Towering skyscrapers, flying vehicles, and holographic advertisements create an immersive sci-fi world inspired by cyberpunk aesthetics.",
        likes: 51,
        createdAt: "2025-01-28"
      },
      {
        id: "5",
        title: "Corridors of Learning",
        artist: "Elena Rodriguez",
        artistId: "artist5",
        imageUrl: "https://images.unsplash.com/photo-1527576539890-dfa815648363",
        category: "Photography",
        description: "A candid black and white photograph capturing students walking through the architectural corridors of a university building. The interplay of light, shadow, and human movement creates a compelling visual narrative about academic life.",
        likes: 64,
        createdAt: "2025-02-19"
      },
      {
        id: "6",
        title: "Street Vendor at Dusk",
        artist: "Devon Park",
        artistId: "artist6",
        imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
        category: "Photography",
        description: "A high-contrast color photograph capturing the vibrant atmosphere of a street food vendor's stall at dusk. The warm glow of the vendor's lights against the darkening sky creates a dramatic scene filled with color, life, and cultural richness.",
        likes: 73,
        createdAt: "2025-03-05"
      }
    ];
  };
  
  // Apply all filters
  const handleApplyFilters = () => {
    // Filters are already applied via useEffect
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-10 px-4">
        <div className="container mx-auto">
          {/* Gallery Header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gallery-darkGray mb-4">
              Student Art Gallery
            </h1>
            <p className="text-gallery-gray max-w-2xl mx-auto">
              Explore a diverse collection of artworks created by talented student artists from around the world.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-10 neumorph p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="relative lg:col-span-5">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gallery-gray" />
                <Input 
                  placeholder="Search by artwork title or artist name" 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="lg:col-span-3">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Painting">Painting</SelectItem>
                    <SelectItem value="Digital Art">Digital Art</SelectItem>
                    <SelectItem value="Photography">Photography</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="lg:col-span-2">
                <Select value={dateSort} onValueChange={setDateSort}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="lg:col-span-2">
                <Button 
                  className="w-full bg-gallery-purple hover:bg-opacity-90"
                  onClick={handleApplyFilters}
                >
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
              </div>
            </div>
          </div>
          
          {/* Artworks Grid */}
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-gallery-gray">Loading artworks...</p>
            </div>
          ) : filteredArtworks.length > 0 ? (
            <div className="artwork-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArtworks.map(artwork => (
                <ArtworkCard key={artwork.id} {...artwork} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium mb-2">No artworks found</h3>
              <p className="text-gallery-gray">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white py-10 px-4 border-t mt-10">
        <div className="container mx-auto text-center text-gallery-gray">
          <p>© 2025 Virtual Art Gallery for Student Exhibitions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Gallery;
