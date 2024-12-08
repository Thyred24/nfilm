import React from 'react';
import styles from "@/components/related-movies/styles.module.css";
import Link from 'next/link';
import Image from 'next/image';

function RelatedMovie({ title, movies, categories, currentMovieCategories = [], isCompact = true }) {

  const getCategoryNames = (ids) => {
    return ids.map(id => {
      const category = categories.find(cat => cat.id === id);
      return category ? category.name : 'Bilinmiyor';
    }).join(', ');
  };

  const filterRelatedMovies = () => {
    const categoryIds = getCategoryIds(); 
    if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
      return []; 
    }

    return movies.filter(movie => 
      movie.genre_ids.some(id => categoryIds.includes(id))
    ).slice(1, 6); 
  };

  const getCategoryIds = () => {
    return currentMovieCategories.map(cat => cat.id);
  };

  const relatedMovies = filterRelatedMovies();

  return (
    <div className={styles.movieSection}>
      {relatedMovies.length > 0 && (
        <div className={styles.relatedMovies}>
          <div className={styles.topSection}>
            <h2>{title}</h2>
            <Link href="/">See More</Link>
          </div>
          <div className={styles.movies}>
            {relatedMovies.map((movie) => (
              <div className={styles.movie} key={movie.id}>
                <Link href={`/movie/${movie.id}`}>
                  <Image 
                    width={280}
                    height={400}
                    unoptimized 
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div className={styles.movieInfoOverlay}>
                    <div className={styles.overlay}>
                      <div className={styles.boxTitle}>
                        {movie.title}
                      </div>
                      <div className={styles.imdb}>
                        <div className={styles.starImg}>
                          <Image 
                            src="/images/star.png"
                            width={25}
                            height={25}
                          />
                        </div>
                        <div className={styles.point}>
                          {movie.vote_average} <span>/ {movie.vote_count} </span>
                        </div>
                      </div>
                      <div className={styles.categoryYear}>
                        <div className={styles.categories}>
                          {getCategoryNames(movie.genre_ids)}
                        </div>
                        <div className={styles.year}>
                          {movie.release_date}
                        </div>
                      </div>
                      <p 
                        className={`${styles.overview} ${isCompact ? styles.shortOverview : ""}`}>
                        {movie.overview}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RelatedMovie;
