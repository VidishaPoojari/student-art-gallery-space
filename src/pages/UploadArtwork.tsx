
import React from 'react';
import Navbar from '@/components/Navbar';
import ArtworkUpload from '@/components/ArtworkUpload';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const UploadArtwork: React.FC = () => {
  const { currentUser, userRole, loading } = useAuth();
  
  // If auth is still loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </main>
      </div>
    );
  }
  
  // If not logged in, redirect to login
  if (!currentUser) {
    toast({
      title: "Authentication Required",
      description: "Please log in to access this page",
      variant: "destructive",
    });
    return <Navigate to="/login" />;
  }
  
  // If not a student artist, show error
  if (userRole !== 'student') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center max-w-md neumorph p-8 rounded-lg">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
            <p className="text-gallery-gray mb-6">
              Only student artists can upload artwork. Please contact an administrator if you believe this is an error.
            </p>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-10 px-4">
        <div className="container mx-auto">
          <ArtworkUpload />
        </div>
      </main>
      
      <footer className="bg-white py-6 px-4 border-t">
        <div className="container mx-auto text-center text-gallery-gray">
          <p>© 2025 StudentArt Gallery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UploadArtwork;
