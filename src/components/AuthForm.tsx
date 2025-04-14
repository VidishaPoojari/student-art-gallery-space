
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GalleryHorizontal } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (e: React.FormEvent<HTMLFormElement>, userType?: string) => void;
  isLoading?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, isLoading = false }) => {
  const isLogin = type === 'login';
  const [userType, setUserType] = useState('visitor');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e, userType);
  };
  
  return (
    <div className="mx-auto max-w-md w-full p-6 neumorph">
      <div className="flex flex-col items-center text-center mb-8">
        <GalleryHorizontal className="h-10 w-10 text-gallery-purple mb-4" />
        <h1 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create an Account'}</h1>
        <p className="text-gallery-gray mt-2">
          {isLogin 
            ? 'Enter your credentials to access your account' 
            : 'Join our community to share your artwork'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" type="text" placeholder="John Doe" required />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="john@example.com" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" placeholder="••••••••" required />
        </div>
        
        {!isLogin && (
          <>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" name="confirmPassword" type="password" placeholder="••••••••" required />
            </div>
            
            <div className="space-y-2">
              <Label>I am registering as:</Label>
              <RadioGroup value={userType} onValueChange={setUserType} className="mt-2">
                <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="cursor-pointer flex-1">
                    <div className="font-medium">Student Artist</div>
                    <p className="text-sm text-gallery-gray">I want to upload artwork</p>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                  <RadioGroupItem value="visitor" id="visitor" />
                  <Label htmlFor="visitor" className="cursor-pointer flex-1">
                    <div className="font-medium">Visitor</div>
                    <p className="text-sm text-gallery-gray">I want to browse and comment</p>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </>
        )}
        
        <Button type="submit" className="w-full bg-gallery-purple hover:bg-opacity-90" disabled={isLoading}>
          {isLoading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
        </Button>
        
        <div className="text-center text-sm mt-4">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <Link to="/register" className="text-gallery-purple hover:underline font-medium">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link to="/login" className="text-gallery-purple hover:underline font-medium">
                Log In
              </Link>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
