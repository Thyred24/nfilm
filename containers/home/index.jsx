'use client'

import React, { useState } from 'react';
import FeaturedMovie from '@/components/featured-movie';
import MovieSection from '@/components/movie-section';
import styles from "@/containers/home/styles.module.css"

function HomeContainer({ movies, categories }) {
  const [favorites, setFavorites] = useState([]);

  if (!movies || movies.length === 0) {
    return <div>No movies available</div>;
  }

  const sortedMovies = [...movies].sort((a, b) => b.vote_average - a.vote_average);

  const handleToggleFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === movie.id)) {
        return prevFavorites.filter((fav) => fav.id !== movie.id);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  return (
    <>
      <FeaturedMovie movie={movies[0]} categories={categories} />
      <MovieSection
        title="POPULAR FILMS"
        movies={sortedMovies.slice(1, 7)} 
        categories={categories}
        showSeeMore={false} 
        save={true}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
      <div className={styles.movie}>
      {favorites.length > 0 && (
        <MovieSection
          title="YOUR FAVORITES"
          movies={favorites}
          categories={categories}
          showSeeMore={false} 
          save={true}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
      </div>
    </>
  );
}

export default HomeContainer;
