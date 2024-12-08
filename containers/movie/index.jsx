import React from 'react';
import FeaturedMovie from '@/components/featured-movie';
import RelatedMovie from '@/components/related-movies';
import GenresSection from '@/components/genres-section';
import styles from "@/containers/movie/styles.module.css"

const MovieContainer = ({ movie, movies, categories }) => {
  return (
    <>
      <FeaturedMovie movie={movie} categories={categories} isCompact={false} />
      <RelatedMovie 
        title="RELATED MOVIES" 
        movies={movies} 
        categories={categories} 
        currentMovieCategories={movie?.genres || []} 
      />
      <div className={styles.genres}>
      <GenresSection
        title="GENRES"
        movies={movies.slice(12, 17)}
        categories={categories}
      />
      </div>
    </>
  );
};

export default MovieContainer;
