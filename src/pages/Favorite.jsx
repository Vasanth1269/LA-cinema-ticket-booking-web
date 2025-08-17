import React from 'react'
import movieposter from '../assets/Accoudet.jpg'
import { useBooking } from '../components/bookingcotext';
import { useNavigate } from 'react-router-dom';

export const Favorite = ({movies}) => {
   const { favorites } = useBooking();
   const { relatedMovies } = useBooking();
    const navigate = useNavigate()
    const MovieDetails  = (movieId)=>{
    navigate('/Movie/:id' ,{
       state: { movieId }
    })
}

  return (
   
   <div className='relative pt-28 bg-black overflow-hidden  text-white'>
    <div class="absolute top-30 left-40 w-[400px] h-[400px] bg-red-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div class="absolute bottom-10 right-0 w-[300px] h-[300px] bg-red-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="flex flex-wrap gap-8 p-6 ml-50 bg-black text-white mb-20  ">
      
                {/* Card */}
                {favorites.map((fovId) => {
  let movie =
    movies.find((m) => m.id === fovId) || relatedMovies.find((m) => m.id === fovId);

  if (!movie) return null; // in case movie is not found

  return (
    <div
      key={movie.id}
      className="bg-[#1c1c2c] relative h-98 rounded-xl overflow-hidden w-72 shadow-lg shadow-black transform transition-transform duration-300 hover:scale-105"
      onClick={(()=>{
            MovieDetails(movie.id)
          })}
    >
      <img
        src={movie.poster}
        alt="Movie Poster"
        className="w-80 h-60 object-cover p-5 pb-0"
      />

      <div className="p-4 pb-0">
        <h2 className="text-lg font-semibold">{movie.title}</h2>
        <p className="text-sm text-gray-400 mt-1">
          {movie.year} • {movie.genres[0]} | {movie.genres[2]} • {movie.duration}
        </p>

        <div className="flex items-center justify-between mt-4">
          <button className="bg-red-600 hover:bg-pink-700 text-white px-4 py-1 rounded-full text-sm "
          onClick={(()=>{
            MovieDetails(movie.id)
          })}
          >
            Buy Tickets
          </button>

          <div className="flex items-center gap-1 text-red-600">
            <span>⭐</span>
            <span className="text-sm">{movie.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
})}

                
                
                
              </div>
   </div>
  );
};

