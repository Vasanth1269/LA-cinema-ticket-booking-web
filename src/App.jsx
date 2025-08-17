
import { Route, Router, Routes, useLocation } from 'react-router-dom'
import { useState , useEffect } from 'react'
import axios from 'axios'
import { Home } from './pages/Home'
import { Navibar } from './components/Navibar'
import { Movie } from './pages/Movie'
import { MovieDetails } from './pages/MovieDetails'
import { SetSelection } from './pages/SetSelection'
import { Favorite } from './pages/Favorite'
import { MyBooking } from './pages/MyBooking'
import { Footer } from './components/Footer'
import ScrollToTop from "./components/ScrollToTop";


 
 export const App = () => {
       const IsAdmin = useLocation().pathname.startsWith('/admin')
      const [movies, setMovies] = useState([]);
const API_KEY = "029092ad8ec8b9fd81e6002e51a6f4b2";

useEffect(() => {
  const fetchMovies = async () => {
    try {
      // 1️⃣ Fetch genres first
      const genreRes = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      const genresMap = {};
      genreRes.data.genres.forEach(g => {
        genresMap[g.id] = g.name;
      });

      // 2️⃣ Fetch Upcoming + Now Playing (recent releases)
      const [upcomingRes, nowPlayingRes] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`),
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
      ]);

      // Combine results (remove duplicates if any)
      const allMovies = [
        ...upcomingRes.data.results,
        ...nowPlayingRes.data.results
      ].filter((v, i, arr) => arr.findIndex(m => m.id === v.id) === i);

      // 3️⃣ For each movie, fetch details + cast + trailer
      const moviesWithDetails = await Promise.all(
        allMovies.map(async (m) => {
          const [detailsRes, creditsRes, videosRes] = await Promise.all([
            axios.get(`https://api.themoviedb.org/3/movie/${m.id}?api_key=${API_KEY}&language=en-US`),
            axios.get(`https://api.themoviedb.org/3/movie/${m.id}/credits?api_key=${API_KEY}&language=en-US`),
            axios.get(`https://api.themoviedb.org/3/movie/${m.id}/videos?api_key=${API_KEY}&language=en-US`)
          ]);

          // 🎭 Top 8 cast members
          const topCast = creditsRes.data.cast.slice(0, 6).map(castMember => ({
            name: castMember.name,
            character: castMember.character,
            profile: castMember.profile_path
              ? `https://image.tmdb.org/t/p/w500${castMember.profile_path}`
              : null
          }));

          // 🎥 First YouTube trailer
          const trailer = videosRes.data.results.find(
            v => v.type === "Trailer" && v.site === "YouTube"
          );
          const trailerUrl = trailer
            ? `https://www.youtube.com/embed/${trailer.key}`
            : null;

          return {
            id: m.id,
            title: m.title,
            year: m.release_date?.split("-")[0] || "N/A",
            genres: m.genre_ids.map(id => genresMap[id] || "Unknown"),
            duration: detailsRes.data.runtime
              ? `${Math.floor(detailsRes.data.runtime / 60)}h ${detailsRes.data.runtime % 60}min`
              : "N/A",
            rating: m.vote_average ? m.vote_average.toFixed(1) : "N/A",
            description: detailsRes.data.overview || "No description available.",
            language: detailsRes.data.original_language?.toUpperCase() || "N/A",
            poster: m.poster_path
              ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
              : null,
            cast: topCast,
            trailerUrl
          };
        })
      );

      setMovies(moviesWithDetails);
      console.log(moviesWithDetails);

    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  fetchMovies();
}, []);


 

   return (
    

        <>
         <ScrollToTop />
          {!IsAdmin &&  <Navibar/>}  
          
      <Routes>
        <Route path='/' element={<Home movies={movies}/>}/>
        <Route path='/Movie' element={<Movie movies={movies}/>}/>
        <Route path='/Movie/:id' element={<MovieDetails movies = {movies}/>} />
         <Route path='/Movie/:id/:selectedDate' element={<SetSelection/>} />
         <Route path='/Favorite' element={<Favorite movies={movies}/>}/>
         <Route path='/MyBooking' element ={<MyBooking movies={movies}/>} />

      </Routes>
     
       {!IsAdmin &&  <Footer/>}  
   </>
     
   )
 }
 
