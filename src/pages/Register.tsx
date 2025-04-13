
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AuthForm from '@/components/AuthForm';

const Register = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real app, we would register the user here
    console.log('Register form submitted');
    
    // Redirect to login page
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4 bg-gradient-to-b from-white to-gallery-lightGray">
        <AuthForm type="register" onSubmit={handleSubmit} />
      </main>
      
      <footer className="bg-white py-6 px-4 border-t">
        <div className="container mx-auto text-center text-gallery-gray">
          <p>© 2025 StudentArt Gallery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Register;
