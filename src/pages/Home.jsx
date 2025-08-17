import React, { useRef, useState,useEffect } from 'react';
import { ArrowRight } from "lucide-react";
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import marvelLogo from '../assets/marvelLogo.svg';
import axios from 'axios';
import MovieList from '../components/loadingani';

export const Home = ({ movies }) => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(4);
  const moreRef = useRef(null);
  
  
 const MovieDetails  = (movieId)=>{
    navigate('/Movie/:id' ,{
       state: { movieId }
    })
}
const handleSeeMore = () => {
  setVisibleCount(prev => prev + 4); // show 5 more cards

  setTimeout(() => {
    if (moreRef.current) {
      moreRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "start"

       });
    }
  }, 90);
};
   
const API_KEY = "029092ad8ec8b9fd81e6002e51a6f4b2";


 const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        // 1️⃣ Get upcoming movies (only first 10 for speed)
        const upcomingRes = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
        );
        const movies = upcomingRes.data.results.slice(0, 3);

        // 2️⃣ Get trailer for each
        const trailersData = await Promise.all(
          movies.map(async (movie) => {
            const videoRes = await axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
            );

            const trailer = videoRes.data.results.find(
              (v) => v.type === "Trailer" && v.site === "YouTube"
            );

            return trailer
              ? {
                  id: movie.id,
                  title: movie.title,
                  year: movie.release_date.split("-")[0],
                  poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                  trailerUrl: `https://www.youtube.com/embed/${trailer.key}`
                }
              : null;
          })
        );

        setTrailers(trailersData.filter(Boolean));
      } catch (err) {
        console.error("Error fetching trailers:", err);
      }
    };

    fetchTrailers();
  }, []);
  

   




  return (
    <div className="relative bg-black overflow-hidden text-white">
      {/* Background Glow Effects */}
      <div className="absolute top-160 right-0 w-[300px] h-[300px] bg-red-600 rounded-full blur-3xl opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-210 left-20 w-[400px] h-[400px] bg-red-600 rounded-full blur-3xl opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-30 left-20 w-[200px] h-[200px] bg-pink-500 rounded-full blur-3xl opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-140 right-20 w-[300px] h-[300px] bg-red-600 rounded-full blur-3xl opacity-10 pointer-events-none"></div>

      {/* Hero Section */}
      <div
        className="bg-local bg-cover bg-center w-full h-screen z-0 relative mb-15"
        style={{ backgroundImage: "url('/bgpic.png')" }}
      >
        <img
          src={marvelLogo}
          alt="Marvel Logo"
          className="absolute bottom-120 left-45"
        />

        <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-[400px] text-white text-center
                md:left-[160px] md:translate-x-0 md:text-left">
  <p className="text-4xl md:text-5xl font-bold mb-4">Guardians of the Galaxy</p>
  <p className="text-base md:text-lg mb-2">
    Action | Adventure | Sci-Fi • 2018 • 2h 8m
  </p>
  <p className="mb-4">
    In a post-apocalyptic world where cities ride on wheels and consume each
    other to survive, two people meet in London and try to stop a conspiracy.
  </p>
  <Link to='/Movie'>
    <button className="bg-red-600 px-6 py-2 mt-4 rounded-[2rem] hover:bg-red-900 transition">
      Explore Movies
    </button>
  </Link>
</div>



      </div>

      {/* Latest Releases */}
      <div className="text-2xl p-4 ml-20 font-semibold text-red-500 flex justify-between">
        <div>Latest Releases</div>
        <div className="hidden md:flex p-4 text-2xl font-semibold cursor-pointer gap-1 hover:text-white ml-[90px] mr-[90px]">
  <Link to='/Movie'>View all</Link>
  <span className="pt-2"><ArrowRight size={20} /></span>
</div>
      </div>
   
      <div className="flex flex-wrap gap-8 justify-center bg-black text-white mb-20">
       <MovieList movies={movies} />
        {movies.slice(0, visibleCount).map((movie , index) => {
            const firstNewIndex = visibleCount - 5; 
           return(
             <>
          <div
          
         onClick={()=>{MovieDetails(movie.id)}} 
            key={movie.id}
            ref={index === firstNewIndex ? moreRef : null} 

            className="bg-[#1c1c2c] relative h-98 rounded-xl cursor-pointer overflow-hidden w-72 shadow-lg shadow-black transform transition-transform duration-300 hover:scale-105"
          >
            {movie.poster && (
              <img
                src={movie.poster}
                alt="Movie Poster"
                className="w-80 h-60 object-cover p-5 pb-0"
              />  
            )}
            
            <div className="p-4 pb-0">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p className="text-sm text-gray-400 mt-1">
                {movie.year} • {movie.genres[0]} | {movie.genres[2]} • {movie.duration}
              </p>
              <div className="flex items-center justify-between mt-4">
                <button className="bg-red-600 hover:bg-pink-700 text-white cursor-pointer px-4 py-1 rounded-full text-sm" onClick={()=>{
                  MovieDetails(movie.id)
                }}>
                  Buy Tickets
                </button>
                <div className="flex items-center gap-1 text-red-600">
                  <span>⭐</span>
                  <span className="text-sm">{movie.rating}</span>
                </div>
              </div>
            </div>
          </div>
          </>
           )     
})}
       
   
       

      </div>
              {visibleCount < movies.length && (
    <button
      onClick={handleSeeMore}
      className="bg-red-600 mx-25 sm:mx-70 mb-20 hover:bg-pink-700 text-white p-2 pl-5 w-40  rounded-md md:mx-180 flex"
    >
       See More
       <ArrowRight size={20} className='mx-2 my-1' />
    </button>
  )}

      {/* Trailers */}
      <h2 className="text-2xl font-semibold text-red-500 mb-6 mx-20">Watch Latest Trailers</h2>
      <div className="relative p-4 pt-2 mx-auto max-w-5xl">
  {trailers.slice(0, 1).map((master) => {
    return (
      <iframe
        src={master.trailerUrl}
        title={`${master.title} trailer`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full aspect-video rounded-md"
      ></iframe>
    );
  })}
</div>


    <div className="max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5 pt-0 mt-6 mx-auto">
  {trailers.map((movie) => {
    return (
      <iframe
        src={movie.trailerUrl}
        title={`${movie.title} trailer`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full aspect-video rounded-2xl"
      ></iframe>
    );
  })}
</div>

    </div>
  );
};



