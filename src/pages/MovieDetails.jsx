import React from 'react'
import { useState , useEffect } from 'react';
import { Heart } from "lucide-react";
import { FaPlayCircle } from "react-icons/fa";
import { useLocation } from 'react-router';
import axios from 'axios';
import dayjs from "dayjs";
import DateSelection from '../components/choosedate';
import { useBooking } from '../components/bookingcotext';
import MovieList from '../components/loadinganim';



export const MovieDetails = ({ movies  }) => {

 
const { favorites, toggleFavorite } = useBooking();


  const location = useLocation()
  const [trailerOpen, setTrailerOpen] = useState(false);
  const {movieId} = location.state

  let movie = movies.find(m => m.id === movieId);
  const [seletmovie , setSeletmovie ] = useState(movie)

const suggestionMovie = (sug)=>{
   
    const suggestion = relatedMovies.find (m => m.id === sug)
       setSeletmovie(suggestion)
     window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
       console.log( "movie",movie)
}

   
 console.log("fromhomepahe", seletmovie)
  const API_KEY = "029092ad8ec8b9fd81e6002e51a6f4b2";
  const [cast, setCast] = useState([]);

const { relatedMovies, setRelatedMovies } = useBooking();
console.log("efwfefdf",relatedMovies)
useEffect(() => {
  if (!movieId) return;

  const fetchRelatedMovies = async () => {
    try {
      // 1️⃣ Get main cast (first 6 actors of the main movie)
      const castRes = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
      );
      const topCast = castRes.data.cast.slice(0, 6);
      setCast(topCast);

      // 2️⃣ Get all movies from those actors
      let allMovies = [];
      for (let actor of topCast) {
        const actorMoviesRes = await axios.get(
          `https://api.themoviedb.org/3/person/${actor.id}/movie_credits?api_key=${API_KEY}&language=en-US`
        );

        const actorMovies = actorMoviesRes.data.cast
          .filter((m) => m.id !== movieId)
          .map((m) => ({
            id: m.id,
            actorName: actor.name
          }));

        allMovies.push(...actorMovies);
      }

      // 3️⃣ Remove duplicates
      const seen = new Set();
      const uniqueMovies = [];
      for (let m of allMovies) {
        if (!seen.has(m.id)) {
          seen.add(m.id);
          uniqueMovies.push(m);
        }
      }

      const moviesWithDetails = await Promise.all(
        uniqueMovies.map(async (m) => {
          try {
            
            const detailsRes = await axios.get(
              `https://api.themoviedb.org/3/movie/${m.id}?api_key=${API_KEY}&language=en-US`
            );
            const d = detailsRes.data;

            
            const videosRes = await axios.get(
              `https://api.themoviedb.org/3/movie/${m.id}/videos?api_key=${API_KEY}&language=en-US`
            );
            const trailer = videosRes.data.results.find(
              (v) => v.type === "Trailer" && v.site === "YouTube"
            );
            const trailerEmbed = trailer
              ? `https://www.youtube.com/embed/${trailer.key}`
              : 'comingsoon';

            
            const relatedCastRes = await axios.get(
              `https://api.themoviedb.org/3/movie/${m.id}/credits?api_key=${API_KEY}&language=en-US`
            );
            const relatedCast = relatedCastRes.data.cast.slice(0, 6).map(castMember => ({
              name: castMember.name,
              character: castMember.character,
              profile: castMember.profile_path
                ? `https://image.tmdb.org/t/p/w500${castMember.profile_path}`
                : null
            }));

            return {
              id: d.id,
              title: d.title,
              description: d.overview || "No description available.",
              language: d.original_language?.toUpperCase() || "N/A",
              year: d.release_date ? d.release_date.split("-")[0] : "N/A",
              genres: d.genres.map((g) => g.name),
              duration:d.runtime ? `${Math.floor(d.runtime/60)}h  ${d.runtime % 60}min` : "N/A",
              rating: d.vote_average ? d.vote_average.toFixed(1) : "N/A",
              poster: d.poster_path
                ? `https://image.tmdb.org/t/p/w500${d.poster_path}`
                : null,
              trailerUrl: trailerEmbed,
              cast: relatedCast,
              actorName: m.actorName
            };
          } catch {
            return null;
          }
        })
      );

      // 5️⃣ Only 2025 releases
      const cleanMovies = moviesWithDetails
        .filter(Boolean)
        .filter((m) => m.year === "2025");

      // Sort by rating
      cleanMovies.sort((a, b) => b.rating - a.rating);

      setRelatedMovies(cleanMovies.slice(0, 4));
    } catch (err) {
      console.error("Error:", err);
    }
  };

  fetchRelatedMovies();
}, [movieId]);


   const dates = Array.from({ length: 5 }, (_, i) =>
    dayjs().add(i, "day").format("MMM DD")
  );
  console.log(dates)


    

  


console.log('favorit',favorites)

 
  return (
    <>
  
   

    <div className='relative bg-black overflow-hidden text-white'>
      <div class="absolute top-10 left-40 w-[400px] h-[300px] bg-red-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      
      <div className='flex justify-center pt-28 sm:p-0'>

        <div className='relative flex justify-center mt-30   overflow-hidden  '>


          <div className='  flex flex-col  mb-20 ml-9   md:flex-row items-center gap-4 '>
<img
  src={seletmovie.poster}
  alt="poster"
  className="w-50 md:w-60 rounded-md"
/>


            <div className='w-[600px] pl-7 text-center sm:text-left md:text-start'>
              <h1 className='text-red-500 text-2xl mt-2'>{seletmovie.language}</h1>
              <h1 className='text-white text-3xl mt-1'>{seletmovie.title}</h1>
              <h1 className='text-white mb-5'>⭐{seletmovie.rating} User Rating</h1>

              <p className='text-white w-100 ml-20 md:mb-5 md:ml-0  md:line-clamp-5'>
                {seletmovie.description}
              </p>
              <h1 className='mb-10 text-gray-500 md:text-white'>{seletmovie.duration} &middot; {seletmovie.genres} &middot; {seletmovie.year}</h1>
              <div className='justify-center  flex md:justify-start md:flex flex-row gap-4'>
                <button className='flex items-center space-x-2 cursor-pointer bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg transition-colors duration-300"' 
                onClick={()=>{setTrailerOpen(!trailerOpen)}}
                
                >

                  <FaPlayCircle size={18} className='text-white' />
                  <span>Watch Trailer</span>
                </button>
                <button className='p-4 w-40 hover:bg-red-800 bg-red-500 rounded-lg cursor-pointer mr-4'>Buy Tickets</button>
                <div className='pt-2'>


                  <button className='rounded-4xl bg-gray-900 p-2 cursor-pointer '   onClick={() => toggleFavorite(seletmovie.id)}>
                    <Heart
                      size={22}
                      className={`transition-colors  duration-100 ${   favorites.includes(seletmovie.id)  ? "fill-red-500 text-red-500" : "fill-gray-900 text-blue-100"
                        }`}
                   
                    />
                  </button>

                </div>
              </div>

            </div>
          </div>

        </div>

        
        
      
        
        
      </div>
      
    </div>
    <span className='mx-10 text-lg md:mx-40'>You Favorite Cost</span>
        <div className=' grid grid-cols-2 p-10 pl-20   md:flex justify-center md:mb-40'>
                   <div class="hidden md:block md:absolute md:top-[850px] md:left-2 md:w-[300px] md:h-[300px] bg-red-600 md:rounded-full md:blur-3xl md:opacity-20 md:pointer-events-none"></div>
                     <div class="hidden md:block md:absolute md:bottom-[1290px] md:right-0 md:w-[300px] md:h-[300px] bg-red-600 md:rounded-full md:blur-3xl md:opacity-20 md:pointer-events-none"></div>

          { seletmovie.cast.map((cast)=>{
            return(
          <div className=''>
            <img src={cast.profile} alt="BenAffleck" className='size-29 p-4 rounded-full' />
        <span className='font-semibold line-clamp-1 flex mx-4 text-sm'>{cast.name}</span>

         
          </div>
            )
          })
}
          
     { trailerOpen && <div onClick={()=>{setTrailerOpen(!trailerOpen)}} className= "fixed top-0 left-0 w-full h-full z-50 flex flex-col items-center justify-center space-y-8 backdrop-blur-md bg-white/10" >
          <iframe
         width='1000'
         height='600'
        src={seletmovie.trailerUrl}
        title={`${seletmovie.title} trailer`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
  </div>}
          
          

        </div>
        <div className=' flex flex-col mb-20 md:flex md:flex-row  md:mx-auto  md:reddrop-blur-md bg-red-700/10 md:h-40 md:w-[1200px] md:gap-5 md:p-6 md:pl-2  md:rounded-lg md:mb-30   '>
          
          <DateSelection movieId={movieId} />


        </div>

    <span className='mx-10    md:mx-30  text-lg '> You May Also like</span>
    <div className="flex flex-wrap gap-8 p-8 cursor-pointer justify-center bg-black text-white mb-20 sm:justify-self-auto  ">
       <MovieList relatedMovies={relatedMovies} />
                 { relatedMovies.map((sug)=>{

                 return (
                 <div  key={sug.id} className="bg-[#1c1c2c] relative  rounded-xl overflow-hidden w-72 shadow-lg
                  shadow-black transform flex flex-col transition-transform duration-300 hover:scale-105"
                   onClick={ ()=>{
                        suggestionMovie(sug.id)
                       }}
                  >
                   <img
                     src={sug.poster}
                     alt="Movie Poster"
                     className="w-80 h-60 object-cover p-5 pb-0 " />
       
                   <div className="p-4 pb-0 ">
                     <h2 className="text-lg font-semibold">{sug.title}</h2>
                     <p className="text-sm text-gray-400 mt-1">
                       {sug.year} • {sug.genres} |  • {sug.duration}
                     </p>
       
                     <div className="flex items-center justify-between mt-4">
                       <button className="bg-red-600 flex hover:bg-pink-700 cursor-pointer text-white px-4 py-1 rounded-full text-sm" onClick={ ()=>{
                        suggestionMovie(sug.id)
                       }
                        }
                       >
                         Buy Tickets
                       </button>
       
                       <div className="flex items-center gap-1 text-red-600">
                         <span>⭐</span>
                         <span className="text-sm">{sug.rating}</span>
                       </div>
                     </div>
                   </div>
              </div>
                 )
                 } )}     
                 
               </div>
               
        </>
  )
 
}


