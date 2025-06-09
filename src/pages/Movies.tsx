
import React, { useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Film } from 'lucide-react';

const recentMovies = [
  { 
    title: "Superboys of Malegaon",
    year: 2024,
    director: "Reema Kagti",
    genre: ["Biography", "Comedy", "Drama"],
    image: "https://m.media-amazon.com/images/M/MV5BYmJjZGFkMzktMjAxZC00ZTNiLTljMzItYzVjMTcyYWNiYWNkXkEyXkFqcGc@._V1_FMjpg_UY3000_.jpg"
  }
];

const allTimeMovies = [
  { title: "War Dogs", year: 2016, genre: ["Comedy", "Crime", "Drama"] },
  { title: "Ready Player One", year: 2018, genre: ["Sci-Fi", "Action", "Adventure"] },
  { title: "Interstellar", year: 2014, genre: ["Sci-Fi", "Adventure", "Drama"] },
  { title: "Top Gun: Maverick", year: 2022, genre: ["Action", "Drama"] },
  { title: "Yesterday", year: 2019, genre: ["Comedy", "Music", "Fantasy"] },
  { title: "Edge of Tomorrow", year: 2014, genre: ["Action", "Sci-Fi"] },
  { title: "Spiderman: No Way Home", year: 2021, genre: ["Action", "Adventure", "Fantasy"] },
  { title: "Ad Astra", year: 2019, genre: ["Sci-Fi", "Adventure", "Drama"] },
  { title: "Godzilla Minus One", year: 2023, genre: ["Action", "Adventure", "Drama"] },
  { title: "The Big Short", year: 2015, genre: ["Biography", "Comedy", "Drama"] },
  { title: "Article 370", year: 2023, genre: ["Drama", "Thriller"] },
  { title: "Maharaja", year: 2023, genre: ["Action", "Drama"] },
  { title: "The Truman Show", year: 1998, genre: ["Comedy", "Drama"] },
  { title: "Moneyball", year: 2011, genre: ["Biography", "Drama", "Sport"] },
  { title: "Oppenheimer", year: 2023, genre: ["Biography", "Drama", "History"] },
  { title: "Prestige", year: 2006, genre: ["Drama", "Mystery", "Sci-Fi"] },
  { title: "Intern", year: 2015, genre: ["Comedy", "Drama"] },
  { title: "Seven", year: 1995, genre: ["Crime", "Drama", "Mystery"] },
  { title: "Laapata Ladies", year: 2023, genre: ["Comedy", "Drama"] },
  { title: "Badla", year: 2019, genre: ["Crime", "Drama", "Mystery"] },
  { title: "Inglorious Bastards", year: 2009, genre: ["Adventure", "Drama", "War"] },
  { title: "Air", year: 2023, genre: ["Drama", "Sport"] },
  { title: "The Green Mile", year: 1999, genre: ["Crime", "Drama", "Fantasy"] }
];

const Movies = () => {
  // Use useMemo to shuffle the movies array on each render
  const shuffledMovies = useMemo(() => {
    // Create a copy of the original array to avoid mutating it
    const moviesCopy = [...allTimeMovies];
    
    // Fisher-Yates shuffle algorithm
    for (let i = moviesCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [moviesCopy[i], moviesCopy[j]] = [moviesCopy[j], moviesCopy[i]];
    }
    
    return moviesCopy;
  }, []); // Empty dependency array ensures it runs on every render

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section with Intro */}
        <section className="space-y-4">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cinematic Journey</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              While I immerse myself in countless films throughout the years, 
              there are those rare gems that resonate deeply within me—stories that 
              leave an indelible mark on my heart and mind. These are the films I believe 
              everyone should experience at least once in their lifetime.
            </p>
          </div>
        </section>

        {/* Recently Watched Section */}
        <section className="animate-fade-in animation-delay-100">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Film className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Recently Watched</h2>
            </div>
            <div className="grid gap-6">
              {recentMovies.map((movie) => (
                <Card key={movie.title} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="w-full md:w-1/3 relative h-64">
                        <img 
                          src={movie.image} 
                          alt={movie.title} 
                          className="object-cover w-full h-full rounded-t-lg md:rounded-t-none md:rounded-l-lg"
                        />
                      </div>
                      <div className="p-6 md:flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-2xl font-bold">{movie.title}</h3>
                          <span className="text-sm text-gray-500">{movie.year}</span>
                        </div>
                        <p className="text-gray-600 mt-2">Director: {movie.director}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {movie.genre.map((g) => (
                            <Badge key={g} variant="outline">{g}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* All-Time Favorites Section */}
        <section className="animate-fade-in animation-delay-200">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Film className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">All-Time Favorites</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shuffledMovies.map((movie) => (
                <Card key={movie.title} className="hover:shadow-md transition-shadow h-full">
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{movie.title}</h3>
                      <span className="text-sm text-gray-500">{movie.year}</span>
                    </div>
                    <div className="mt-auto pt-3 flex flex-wrap gap-1">
                      {movie.genre.map((g) => (
                        <Badge key={g} variant="secondary" className="text-xs">{g}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Movies;
