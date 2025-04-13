
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AuthForm from '@/components/AuthForm';

const Login = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real app, we would authenticate the user here
    console.log('Login form submitted');
    
    // Redirect to home page
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4 bg-gradient-to-b from-white to-gallery-lightGray">
        <AuthForm type="login" onSubmit={handleSubmit} />
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
