
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { currentUser, userRole, loading } = useAuth();
  
  // If auth is still loading, show nothing or a loading spinner
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // If user is not logged in, redirect to login page
  if (!currentUser) {
    toast({
      title: "Authentication Required",
      description: "Please log in to access this page",
      variant: "destructive",
    });
    return <Navigate to="/login" />;
  }
  
  // If a specific role is required and user doesn't have it, redirect to gallery
  if (requiredRole && userRole !== requiredRole && userRole !== 'owner') {
    toast({
      title: "Access Denied",
      description: `Only ${requiredRole === 'student' ? 'student artists' : requiredRole} can access this page`,
      variant: "destructive",
    });
    return <Navigate to="/gallery" />;
  }
  
  // User is authenticated and has the required role, render children
  return <>{children}</>;
};

export default ProtectedRoute;
