
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/Layout';

const workExperience = [
  {
    year: "2023",
    title: "Senior Software Engineer",
    description: "Led development of complex web applications using React and TypeScript. Mentored junior developers and implemented best practices."
  },
  {
    year: "2021",
    title: "Software Engineer",
    description: "Developed and maintained multiple client projects. Collaborated with cross-functional teams to deliver high-quality solutions."
  },
  {
    year: "2019",
    title: "Junior Software Engineer",
    description: "Started professional career in web development. Worked on frontend development using React and contributed to various client projects."
  }
];

const Work = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <section className="space-y-4">
          <h1 className="text-4xl font-bold text-primary">My Work</h1>
          <p className="text-lg text-gray-600">
            My professional journey
          </p>
        </section>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-primary/20" />
          
          <div className="space-y-12">
            {workExperience.map((experience, index) => (
              <div key={experience.year} className="relative group">
                {/* Timeline dot - centered on mobile */}
                <div className="absolute left-4 transform -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 top-0 w-6 h-6 rounded-full bg-primary border-4 border-white transition-transform duration-300 group-hover:scale-125" />
                
                {/* Content */}
                <div className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Year */}
                  <div className={`pl-12 md:w-1/2 mb-4 md:mb-0 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                    <span className="text-lg font-semibold text-primary animate-fade-in">{experience.year}</span>
                  </div>
                  
                  {/* Experience details */}
                  <div className={`pl-12 md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                    <Card className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-scale-in">
                      <CardHeader>
                        <CardTitle className="text-xl">{experience.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{experience.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Work;
