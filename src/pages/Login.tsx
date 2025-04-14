
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    try {
      await login(email, password);
      navigate('/gallery');
    } catch (error) {
      // Error toast is handled in the login function
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
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
          <p>© 2025 Virtual Art Gallery for Student Exhibitions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
