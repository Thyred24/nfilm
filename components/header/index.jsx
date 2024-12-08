'use client'

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from "@/components/header/styles.module.css";

const apiKey = '9a2ffa63bf8fcded3b3a9f59d0b521d5';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const debounce = (func, delay) => {
    let debounceTimer;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const fetchSearchResults = async (query) => {
    if (query.length > 2) {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
      const data = await response.json();
      setSearchResults(data.results);
      setIsDropdownVisible(true);
    } else {
      setSearchResults([]);
      setIsDropdownVisible(false);
    }
  };

  const handleSearch = useCallback(debounce((query) => fetchSearchResults(query), 500), []);

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    handleSearch(query);
  };

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const toggleMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <header className={`${styles.header} container fluid`}>
      <div className={styles.overlay}></div>
      <div className={styles.headerWrapper}>
        <div>
          <Link href="/">
            <Image 
              src="/images/logo.png"
              width={50}
              height={90}
              alt='logo'
            />
          </Link>
        </div>
        <div className={styles.responsivebtn} onClick={toggleMenuVisibility}>
          <Image 
            src="/icons/responsivebtn.png"
            width={40}
            height={34}
            alt="menu"
          />
          {isMenuVisible && (
            <div className={styles.navigationMenu}>
              <Link href="/movie">Movies</Link>
              <Link href="/">Series</Link>
              <Link href="/genres">Genres</Link>
            </div>
          )}
        </div>
        <div className={styles.inputSearch}>
          <input 
            type='text'
            name='name'
            placeholder='Search...'
            className={`${styles.input} ${isSearchVisible ? styles.show : ''}`}
            value={searchTerm}
            onChange={handleChange}
          />
          <Image 
            src="/icons/search.png"
            width={20}
            height={20}
            className={styles.search}
            onClick={toggleSearchVisibility} // Toggle search input on click
          />
          {isDropdownVisible && searchResults.length > 0 && (
            <div className={styles.searchDropdown}>
              {searchResults.map(movie => (
                <Link key={movie.id} href={`/movie/${movie.id}`}>
                  <div className={styles.searchResult}>
                    <Image 
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                      width={50} 
                      height={75} 
                      alt={movie.title} 
                    />
                    <div className={styles.resultInfo}>
                      <div className={styles.resultTitle}>{movie.title}</div>
                      <div className={styles.resultReleaseDate}>{movie.release_date}</div>
                    </div>
                  </div>
                  <div className={styles.signIn}>
                    Watch Now
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header;
