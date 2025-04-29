
import React from 'react';
import { Layout } from '@/components/Layout';
import { SubstackPosts } from '@/components/SubstackPosts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Hero/Jumbotron Section */}
        <section className="space-y-4">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hi, I'm Vaibhav Rathore
            </h1>
            <p className="text-xl text-gray-600">
              Software engineer, avid reader, and music enthusiast. 
              I'm passionate about building products that make a positive impact.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/work">View My Work</Link>
              </Button>
              <Button variant="outline" asChild>
                <a 
                  href="https://github.com/rathorevaibhav" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Profile
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="animate-fade-in animation-delay-100">
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=1200"
              alt="Profile" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
              <h2 className="text-white text-xl font-medium">
                Bringing ideas to life through technology
              </h2>
            </div>
          </div>
        </section>

        {/* Work Preview Section */}
        <section className="animate-fade-in animation-delay-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">My Work</h2>
            <Link to="/work" className="text-primary hover:text-primary/80">
              View all →
            </Link>
          </div>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div>
                <h3 className="text-xl font-medium mb-2">ColoredCow</h3>
                <p className="text-gray-600 mb-4">
                  Working as a Senior Software Engineer, leading multiple projects and mentoring junior developers.
                  Specialized in building scalable web applications with modern technologies.
                </p>
                <Link 
                  to="/work" 
                  className="text-primary hover:text-primary/80"
                >
                  Learn more about my work →
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Interests & Hobbies Section */}
        <section className="grid md:grid-cols-2 gap-8 animate-fade-in animation-delay-300">
          <div>
            <h2 className="text-2xl font-bold mb-4">Hobbies</h2>
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    Reading science fiction and philosophy books
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    Playing guitar and exploring new music genres
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    Photography and visual storytelling
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    Hiking and exploring nature
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Interests</h2>
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    Web development and modern frontend technologies
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    UI/UX design principles and accessibility
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    Open source software and community building
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    Artificial intelligence and machine learning applications
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Blog/Substack Section */}
        <section className="animate-fade-in animation-delay-400">
          <SubstackPosts />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
