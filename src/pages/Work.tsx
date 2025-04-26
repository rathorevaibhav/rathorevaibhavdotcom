
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/Layout';

const Work = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <section className="space-y-4">
          <h1 className="text-4xl font-bold text-primary">My Work</h1>
          <p className="text-lg text-gray-600">
            My professional journey and experiences at ColoredCow
          </p>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>ColoredCow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              [Add description about ColoredCow and your role]
            </p>
            
            <h3 className="font-semibold text-lg">Key Responsibilities</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>[Responsibility 1]</li>
              <li>[Responsibility 2]</li>
              <li>[Responsibility 3]</li>
            </ul>

            <h3 className="font-semibold text-lg">Projects</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>[Project 1]</li>
              <li>[Project 2]</li>
              <li>[Project 3]</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Work;
