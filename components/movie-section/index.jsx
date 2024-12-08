import React from 'react';
import styles from "@/components/movie-section/styles.module.css";
import Image from 'next/image';
import Link from 'next/link';

function MovieSection({ title, movies, categories, isCompact = true, showSeeMore = true, save = true, favorites = [], onToggleFavorite }) {
  const getCategoryNames = (ids) => {
    return ids.map(id => {
      const category = categories.find(cat => cat.id === id);
      return category ? category.name : 'Unknown';
    }).join(', ');
  };

  const isFavorite = (movie) => {
    return favorites.some(fav => fav.id === movie.id);
  };

  return (
    <div className={styles.movieSection}>
      <div className={styles.myFavorites}>
        <div className={styles.topSection}>
          <h2>
            {title}
          </h2>
          {showSeeMore && (
            <Link href={`/genres`}>
              <div className={styles.moreText}>
                See More
              </div>
            </Link>
          )}
        </div>
        <div className={styles.movies}>
          {movies.map((movie) => (
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
                        {movie.vote_average} <span>/ {movie.vote_count}</span>
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
                      className={`${styles.overview} ${isCompact ? styles.shortOverview : ""}`}
                    >
                      {movie.overview}
                    </p>
                    {save && (
                      <div className={styles.saveIcon} onClick={(e) => {
                        e.preventDefault();
                        onToggleFavorite(movie);
                      }}>
                        <Image 
                          src={isFavorite(movie) ? "/icons/orangeSave.png" : "/icons/griSave.png"}
                          width={40}
                          height={40}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieSection;
