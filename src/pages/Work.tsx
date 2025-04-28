
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/Layout';

const workExperience = [
  {
    year: "2023",
    title: "Senior Software Engineer",
    company: "ColoredCow",
    description: "Led development of complex web applications using React and TypeScript. Mentored junior developers and implemented best practices."
  },
  {
    year: "2021",
    title: "Software Engineer",
    company: "ColoredCow",
    description: "Developed and maintained multiple client projects. Collaborated with cross-functional teams to deliver high-quality solutions."
  },
  {
    year: "2019",
    title: "Junior Software Engineer",
    company: "ColoredCow",
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
            My professional journey at ColoredCow
          </p>
        </section>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20" />
          
          <div className="space-y-12">
            {workExperience.map((experience, index) => (
              <div key={experience.year} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white" />
                
                {/* Content */}
                <div className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Year */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <span className="text-lg font-semibold text-primary">{experience.year}</span>
                  </div>
                  
                  {/* Experience details */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">{experience.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-medium text-primary/80 mb-2">{experience.company}</p>
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
