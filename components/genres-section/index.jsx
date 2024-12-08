import React from 'react';
import styles from "@/components/genres-section/styles.module.css";
import Image from 'next/image';
import Link from 'next/link';

function GenresSection({ title, movies, categories, isCompact = true, showSeeMore = true }) {

  const getCategoryNames = (ids) => {
    return ids.map(id => {
      const category = categories.find(cat => cat.id === id);
      return category ? category.name : 'Unknown';
    }).join(', ');
  };

  return (
    <div className={styles.GenresSection}>
      <div className={styles.myFavorites}>
        <div className={styles.topSection}>
          <h2>{title}</h2>
          {showSeeMore && (
            <Link href={`/genres`}>
              <div className={styles.moreText}>See More</div>
            </Link>
          )}
        </div>
        <div className={styles.categories}>
          {categories.slice(0, 6).map(category => {
            const categoryMovies = movies.filter(movie => movie.genre_ids.includes(category.id)).slice(0, 1);
            return (
              <div className={styles.categoryBox} key={category.id}>
                <div className={styles.movies}>
                  {categoryMovies.length > 0 ? (
                    categoryMovies.map(movie => (
                      <div className={styles.movie} key={movie.id}>
                        <Link href={`genres`}>
                          <Image
                            width={280}
                            height={180}
                            unoptimized
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt={movie.title}
                          />
                          <div className={styles.movieInfoOverlay}>
                            <div className={styles.movieCategories}>
                            <h3>{category.name}</h3>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p>Bu kategoride film bulunamadı.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GenresSection;
