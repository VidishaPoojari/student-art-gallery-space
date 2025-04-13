
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserAuthButton from '@/components/UserAuthButton';

const NavbarWithAuth: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-gallery-purple">StudentArt</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gallery-darkGray hover:text-gallery-purple font-medium transition-colors">
              Home
            </Link>
            <Link to="/gallery" className="text-gallery-darkGray hover:text-gallery-purple font-medium transition-colors">
              Gallery
            </Link>
            <Link to="/upload" className="text-gallery-darkGray hover:text-gallery-purple font-medium transition-colors">
              Upload
            </Link>
            <Link to="/about" className="text-gallery-darkGray hover:text-gallery-purple font-medium transition-colors">
              About
            </Link>
          </nav>
          
          {/* Auth Button (Desktop) */}
          <div className="hidden md:block">
            <UserAuthButton />
          </div>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t mt-4 animate-in fade-in slide-in-from-top-5">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gallery-darkGray hover:text-gallery-purple font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/gallery" 
                className="text-gallery-darkGray hover:text-gallery-purple font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                to="/upload" 
                className="text-gallery-darkGray hover:text-gallery-purple font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Upload
              </Link>
              <Link 
                to="/about" 
                className="text-gallery-darkGray hover:text-gallery-purple font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              <div className="pt-2 border-t">
                <UserAuthButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavbarWithAuth;
