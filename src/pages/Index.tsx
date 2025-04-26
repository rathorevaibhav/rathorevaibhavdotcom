
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/Layout';

const Index = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <section className="space-y-4">
          <h1 className="text-4xl font-bold text-primary">Hello, I'm [Your Name]</h1>
          <p className="text-lg text-gray-600">
            Welcome to my personal space where I share my journey, interests, and experiences.
          </p>
        </section>

        <section className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                [Add your brief introduction here]
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Work</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Currently working at ColoredCow, where I [brief description of your role].
                <a href="/work" className="text-primary hover:text-primary/80 ml-2">
                  Learn more about my work →
                </a>
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hobbies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>[Hobby 1]</li>
                  <li>[Hobby 2]</li>
                  <li>[Hobby 3]</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>[Interest 1]</li>
                  <li>[Interest 2]</li>
                  <li>[Interest 3]</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
