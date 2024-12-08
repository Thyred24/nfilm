import HomeContainer from "@/containers/home";
import MovieContainer from "@/containers/movie";

const getData = async (page = 1) => {
  const apiKey = '9a2ffa63bf8fcded3b3a9f59d0b521d5';
  
  try {
    const moviesResponse = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`);
    const categoriesResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
    if (!moviesResponse.ok) {
      throw new Error('Failed to fetch movies');
    }
    if (!categoriesResponse.ok) {
      throw new Error('Failed to fetch categories');
    }
    const movies = await moviesResponse.json();
    const categories = await categoriesResponse.json();
    return {
      movies: movies.results, 
      categories: categories.genres 
    };
  } catch (error) {
    console.error('Fetching data failed:', error);
    return null;
  }
};

export default async function Home() {
  const data = await getData();
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <HomeContainer movies={data.movies} categories={data.categories} />
      <MovieContainer movies={data.movies} categories={data.categories} />
    </>
  );
}
