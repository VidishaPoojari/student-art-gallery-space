
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar } from '@/components/ui/avatar';
import { LogOut, Upload, User, Settings } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const UserAuthButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Check authentication status (would use auth context in a real app)
  useEffect(() => {
    const authStatus = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('userRole');
    
    setIsLoggedIn(authStatus);
    setUserRole(role);
  }, []);
  
  // Handle logout
  const handleLogout = () => {
    // In a real app, this would sign out from Firebase/Supabase
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    
    setIsLoggedIn(false);
    setUserRole(null);
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    
    navigate('/');
  };
  
  // If not logged in, show login and register buttons
  if (!isLoggedIn) {
    return (
      <div className="flex gap-2">
        <Link to="/login">
          <Button variant="ghost" className="text-gallery-darkGray hover:text-gallery-purple">
            Log In
          </Button>
        </Link>
        <Link to="/register">
          <Button className="bg-gallery-purple hover:bg-opacity-90">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }
  
  // If logged in, show user dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <User className="h-6 w-6" />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm font-medium">User Account</p>
            <p className="text-xs text-muted-foreground">
              Role: {userRole === 'student' ? 'Student Artist' : userRole === 'owner' ? 'Owner' : 'Visitor'}
            </p>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>My Profile</span>
          </Link>
        </DropdownMenuItem>
        
        {userRole === 'student' && (
          <DropdownMenuItem asChild>
            <Link to="/upload" className="cursor-pointer">
              <Upload className="mr-2 h-4 w-4" />
              <span>Upload Artwork</span>
            </Link>
          </DropdownMenuItem>
        )}
        
        {userRole === 'owner' && (
          <DropdownMenuItem asChild>
            <Link to="/admin" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Admin Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAuthButton;
