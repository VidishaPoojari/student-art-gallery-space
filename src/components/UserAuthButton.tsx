
import React from 'react';
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
import { useAuth } from '@/contexts/AuthContext';

const UserAuthButton = () => {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  // If not logged in, show login and register buttons
  if (!currentUser) {
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
