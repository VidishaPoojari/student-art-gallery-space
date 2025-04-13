
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GalleryHorizontal } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-gallery-lightGray">
      <div className="max-w-md w-full px-8 py-12 neumorph text-center">
        <GalleryHorizontal className="h-16 w-16 text-gallery-purple mx-auto mb-6" />
        
        <h1 className="text-4xl font-bold text-gallery-darkGray mb-2">404</h1>
        <p className="text-xl text-gallery-darkGray mb-6">Artwork Not Found</p>
        
        <p className="text-gallery-gray mb-8">
          The masterpiece you're looking for seems to have been moved or doesn't exist.
        </p>
        
        <Link to="/">
          <Button className="bg-gallery-purple hover:bg-opacity-90 w-full">
            Return to Gallery
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
