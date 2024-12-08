import React from 'react';
import MovieContainer from '@/containers/movie';

const getData = async (params) => {
    const { id } = params;
    const apiKey = '9a2ffa63bf8fcded3b3a9f59d0b521d5';
  
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
        const genresResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
        const moviesResponse = (await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=1`));
      
        if (!response.ok || !genresResponse.ok) {
            throw new Error('Ağ yanıtı iyi değil');
        }

        const movie = await response.json();
        const movies = await moviesResponse.json();
        const genres = await genresResponse.json();

        return {
            movie,
            categories: genres.genres,
            movies: movies.results,
        };
    } catch (error) {
        console.error('Verilerin getirilmesi başarısız oldu:', error);
        return {
            notFound: true,
        };
    }
};

const MoviePage = async ({ params }) => {
  const data = await getData(params);

  
  if (data.notFound) {
      return <div>Movie not found</div>;
  }

  return (
      <>
        <MovieContainer movie={data.movie} movies={data?.movies} categories={data.categories} />
      </>
  );
}

export default MoviePage;
