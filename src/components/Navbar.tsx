
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GalleryHorizontal, LogIn, Menu, Search, User, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  // Use the auth context instead of localStorage directly
  const { currentUser } = useAuth();
  const isLoggedIn = !!currentUser;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/gallery?search=${encodeURIComponent(searchTerm)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo and site name */}
          <Link to="/" className="flex items-center space-x-2">
            <GalleryHorizontal className="h-6 w-6 text-gallery-purple" />
            <span className="text-xl font-semibold">StudentArt</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gallery-darkGray hover:text-gallery-purple font-medium transition-colors">
              Home
            </Link>
            <Link to="/gallery" className="text-gallery-darkGray hover:text-gallery-purple font-medium transition-colors">
              Gallery
            </Link>
            <Link to="/about" className="text-gallery-darkGray hover:text-gallery-purple font-medium transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            {isLoggedIn ? (
              <Link to="/profile">
                <Button variant="outline" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
            
            <Link to="/register">
              <Button className="bg-gallery-purple hover:bg-opacity-90">Join as Artist</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-md p-2 text-gallery-darkGray hover:bg-gray-100"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden py-2 px-4 bg-white border-t">
          <nav className="flex flex-col space-y-4 py-4">
            <Link to="/" className="text-gallery-darkGray hover:text-gallery-purple font-medium px-2 py-2 rounded-md hover:bg-gray-50">
              Home
            </Link>
            <Link to="/gallery" className="text-gallery-darkGray hover:text-gallery-purple font-medium px-2 py-2 rounded-md hover:bg-gray-50">
              Gallery
            </Link>
            <Link to="/about" className="text-gallery-darkGray hover:text-gallery-purple font-medium px-2 py-2 rounded-md hover:bg-gray-50">
              About
            </Link>
            
            <hr className="my-2" />
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2 justify-start px-2 py-2"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
              Search
            </Button>
            
            {isLoggedIn ? (
              <Link to="/profile" className="flex items-center gap-2 text-gallery-darkGray hover:text-gallery-purple font-medium px-2 py-2 rounded-md hover:bg-gray-50">
                <User className="h-4 w-4" />
                Profile
              </Link>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-gallery-darkGray hover:text-gallery-purple font-medium px-2 py-2 rounded-md hover:bg-gray-50">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            )}
            
            <Link to="/register" className="px-2 py-2">
              <Button className="w-full bg-gallery-purple hover:bg-opacity-90">Join as Artist</Button>
            </Link>
          </nav>
        </div>
      )}

      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Search Artworks</DialogTitle>
            <DialogDescription>
              Find artworks by title or artist name
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSearch} className="flex gap-2 mt-2">
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Search</Button>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
