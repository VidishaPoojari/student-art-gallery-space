
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AuthForm from '@/components/AuthForm';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Demo auth logic - in a real app this would verify with Firebase/Supabase
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    // Simple validation for demo
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    // Simulate authentication
    setTimeout(() => {
      // Store auth state in localStorage for demo purposes
      // In a real app, this would be managed by Firebase/Supabase Auth
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', 'user123');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRole', email.includes('student') ? 'student' : email.includes('owner') ? 'owner' : 'visitor');
      
      toast({
        title: "Login Successful",
        description: "You are now logged in",
      });
      
      // Redirect to gallery
      navigate('/gallery');
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4 bg-gradient-to-b from-white to-gallery-lightGray">
        <AuthForm 
          type="login" 
          onSubmit={handleSubmit} 
          isLoading={loading}
        />
      </main>
      
      <footer className="bg-white py-6 px-4 border-t">
        <div className="container mx-auto text-center text-gallery-gray">
          <p>© 2025 StudentArt Gallery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
