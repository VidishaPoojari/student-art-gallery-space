
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ArtworkCard from '@/components/ArtworkCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Calendar } from 'lucide-react';

// Updated mock data with 6 distinct artworks across 3 categories
const artworks = [
  {
    id: "1",
    title: "Village in the Monsoon",
    artist: "Priya Sharma",
    artistId: "artist1",
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
    category: "Painting",
    likes: 87,
    createdAt: "2025-01-15"
  },
  {
    id: "2",
    title: "Fruits of Labor",
    artist: "Marcus Johnson",
    artistId: "artist2",
    imageUrl: "https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    category: "Painting",
    likes: 42,
    createdAt: "2025-02-03"
  },
  {
    id: "3",
    title: "Study Under the Tree",
    artist: "Aisha Patel",
    artistId: "artist3",
    imageUrl: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "Digital Art",
    likes: 38,
    createdAt: "2025-03-12"
  },
  {
    id: "4",
    title: "Neon Metropolis 2077",
    artist: "James Wilson",
    artistId: "artist4",
    imageUrl: "https://images.unsplash.com/photo-1520262454473-a1a82276a574?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    category: "Digital Art",
    likes: 51,
    createdAt: "2025-01-28"
  },
  {
    id: "5",
    title: "Corridors of Learning",
    artist: "Elena Rodriguez",
    artistId: "artist5",
    imageUrl: "https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    category: "Photography",
    likes: 64,
    createdAt: "2025-02-19"
  },
  {
    id: "6",
    title: "Street Vendor at Dusk",
    artist: "Devon Park",
    artistId: "artist6",
    imageUrl: "https://images.unsplash.com/photo-1519075677053-4bcc089df102?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    category: "Photography",
    likes: 73,
    createdAt: "2025-03-05"
  }
];

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [dateSort, setDateSort] = useState('newest');
  
  // Filter artworks based on search term, category, and date
  const filteredArtworks = artworks
    .filter(artwork => {
      const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           artwork.artist.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || artwork.category === category;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (dateSort === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
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
                <Button className="w-full bg-gallery-purple hover:bg-opacity-90">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
              </div>
            </div>
          </div>
          
          {/* Artworks Grid */}
          {filteredArtworks.length > 0 ? (
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
          <p>© 2025 StudentArt Gallery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Gallery;
