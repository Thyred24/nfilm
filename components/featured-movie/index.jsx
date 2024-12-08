import React from 'react';
import styles from '@/components/featured-movie/styles.module.css';
import Image from 'next/image';
import Link from 'next/link';

function FeaturedMovie({ movie, categories, isCompact = true }) {

    if (!movie) {
      return <div> </div>;
    }
  
    const { poster_path, original_title, overview, vote_average, vote_count, release_date, genres } = movie;
  
    const getCategoryNames = (genreObjects = []) => {
        return genreObjects.map(genre => genre.name).join(', ');
    };
      
  
    const categoryNames = getCategoryNames(genres);

  return (
    <div className={styles.movieWrapper}>
      <h1 className={styles.movieTitle}>{original_title}</h1>
      <p className={`${styles.overview} ${isCompact ? styles.shortOverview : ""}`}>
        {overview}
      </p>
      <div className={styles.movieInfo}>
        <Image
          src="/images/star.png"
          width={40}
          height={40}
          alt="Rating"
        />
        <div className={styles.imdb}>
          <div className={styles.point}>
            {vote_average} <span>/ {vote_count}</span>
          </div>
          <div className={styles.category}>
            {categoryNames}
          </div>
          <div className={styles.year}>
            {release_date}
          </div>
        </div>
      </div>
      <Link href={`/movie/${movie.id}`}>
        <div className={styles.playBtn}>Watch Now</div>
      </Link>
      <div className={styles.moviePoster}>
        <div className={styles.moviePosterOverlay}></div>
        <Image
          unoptimized
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt={original_title}
          layout="fill"
        />
      </div>
    </div>
  );
}

export default FeaturedMovie;
