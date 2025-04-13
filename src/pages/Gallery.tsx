
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ArtworkCard from '@/components/ArtworkCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

// Mock data for initial UI
const artworks = [
  {
    id: "1",
    title: "Urban Dreamscape",
    artist: "Sophia Chen",
    artistId: "artist1",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    category: "Digital Art",
    likes: 87
  },
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
  },
  {
    id: "5",
    title: "Expressionist Portrait",
    artist: "Elena Rodriguez",
    artistId: "artist5",
    imageUrl: "https://images.unsplash.com/photo-1461344577544-4e5dc9487184?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    category: "Painting",
    likes: 64
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
    id: "7",
    title: "City at Dusk",
    artist: "Michael Brown",
    artistId: "artist7",
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    category: "Photography",
    likes: 45
  },
  {
    id: "8",
    title: "Nature's Patterns",
    artist: "Sarah Kim",
    artistId: "artist8",
    imageUrl: "https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    category: "Photography",
    likes: 29
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

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  
  // Filter artworks based on search term and category
  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         artwork.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || artwork.category === category;
    
    return matchesSearch && matchesCategory;
  });
  
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
              <div className="relative lg:col-span-7">
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
                <Button className="w-full bg-gallery-purple hover:bg-opacity-90">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
              </div>
            </div>
          </div>
          
          {/* Artworks Grid */}
          {filteredArtworks.length > 0 ? (
            <div className="artwork-grid">
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
          <p>© 2025 StudentArt Gallery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Gallery;
