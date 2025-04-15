
import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-10 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gallery-darkGray mb-4">
              About StudentArt Gallery
            </h1>
            <p className="text-gallery-gray max-w-2xl mx-auto">
              Showcasing the creativity and talent of student artists around the world.
            </p>
          </div>
          
          {/* Mission Section */}
          <div className="neumorph p-8 rounded-lg mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gallery-purple">Our Mission</h2>
            <p className="text-gallery-darkGray mb-4">
              StudentArt Gallery was created to provide a platform for student artists to share their work with a global audience. 
              We believe that art education is essential, and that student artists deserve a dedicated space to exhibit their creativity.
            </p>
            <p className="text-gallery-darkGray">
              Our platform enables students to build their portfolios, receive feedback, and connect with other artists and art enthusiasts,
              fostering a supportive community for artistic growth and development.
            </p>
          </div>
          
          {/* Features */}
          <h2 className="text-2xl font-bold mb-6 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 neumorph">
              <h3 className="text-xl font-semibold mb-3 text-gallery-purple">For Student Artists</h3>
              <ul className="space-y-2 text-gallery-darkGray mb-4">
                <li>• Create your artist profile</li>
                <li>• Upload and showcase your artwork</li>
                <li>• Build a digital portfolio</li>
                <li>• Receive feedback and engagement</li>
              </ul>
              <Link to="/register">
                <Button className="w-full bg-gallery-purple hover:bg-opacity-90">
                  Join as an Artist
                </Button>
              </Link>
            </Card>
            
            <Card className="p-6 neumorph">
              <h3 className="text-xl font-semibold mb-3 text-gallery-purple">For Art Enthusiasts</h3>
              <ul className="space-y-2 text-gallery-darkGray mb-4">
                <li>• Discover new talented artists</li>
                <li>• Browse diverse art categories</li>
                <li>• Like and comment on artworks</li>
                <li>• Support emerging student artists</li>
              </ul>
              <Link to="/gallery">
                <Button className="w-full bg-gallery-purple hover:bg-opacity-90">
                  Explore Gallery
                </Button>
              </Link>
            </Card>
            
            <Card className="p-6 neumorph">
              <h3 className="text-xl font-semibold mb-3 text-gallery-purple">For Educators</h3>
              <ul className="space-y-2 text-gallery-darkGray mb-4">
                <li>• Showcase student work</li>
                <li>• Organize virtual exhibitions</li>
                <li>• Support artistic development</li>
                <li>• Connect with other art educators</li>
              </ul>
              <Link to="/register">
                <Button className="w-full bg-gallery-purple hover:bg-opacity-90">
                  Get Started
                </Button>
              </Link>
            </Card>
          </div>
          
          {/* Join CTA */}
          <div className="bg-gallery-lightGray p-8 rounded-lg text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Join Our Creative Community</h2>
            <p className="mb-6 text-gallery-darkGray">
              Whether you're a student artist looking to showcase your work or an art enthusiast eager to discover new talent,
              there's a place for you in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button className="bg-gallery-purple hover:bg-opacity-90">
                  Create Account
                </Button>
              </Link>
              <Link to="/gallery">
                <Button variant="outline">
                  Explore Gallery
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white py-6 px-4 border-t mt-10">
        <div className="container mx-auto text-center text-gallery-gray">
          <p>© 2025 Virtual Art Gallery for Student Exhibitions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
