import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ArtworkCard from '@/components/ArtworkCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Calendar } from 'lucide-react';
import { getArtworks, Artwork, mockArtworks } from '@/services/artworkService';
import { toast } from '@/components/ui/use-toast';

const Gallery = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [dateSort, setDateSort] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch artworks from Firestore or use mock data
  useEffect(() => {
    const fetchArtworks = async () => {
      setIsLoading(true);
      try {
        const fetchedArtworks = await getArtworks();
        setArtworks(fetchedArtworks);
      } catch (error) {
        console.error('Error in Gallery component fetching artworks:', error);
        // If all else fails, use mock data directly
        setArtworks(mockArtworks);
        toast({
          title: "Error loading artworks",
          description: "Displaying sample artworks instead",
          variant: "destructive",
        });
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
                  onClick={() => handleApplyFilters()}
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
