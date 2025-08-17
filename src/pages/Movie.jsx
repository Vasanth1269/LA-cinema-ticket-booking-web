import React from 'react'
import { useNavigate } from 'react-router-dom';
import MovieList from '../components/loadingani';

export const Movie = ({ movies }) => {
  const navigate = useNavigate();

  const MovieDetails  = (movieId)=>{
    navigate('/Movie/:id' ,{
       state: { movieId }
    })
}
  return (
    <div className="flex flex-wrap gap-8 justify-center bg-black text-white mt-20 ">
    <MovieList movies={movies} />
        { movies.map((movie)=>{

        return(
              <div key={movie.id} className="bg-[#1c1c2c] cursor-pointer   h-98 rounded-xl overflow-hidden w-72 shadow-lg shadow-black 
              transform transition-transform duration-300 hover:scale-105"
               onClick={()=>{
                      MovieDetails(movie.id)
                    }}
              >
                    {movie.poster && <img
                            src={movie.poster}
                          alt="Movie Poster"
                           className="w-80 h-60 object-cover p-5 pb-0 " />}
    
                <div className="p-4 pb-0 ">
                  <h2 className="text-lg font-semibold">{movie.title}</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    {movie.year} • {movie.genres[0]} | {movie.genres[2]} • {movie.duration}
                  </p>
    
                  <div className="flex items-center justify-between mt-4" >
                    <button className="bg-red-600 hover:bg-pink-700 text-white px-4 py-1 rounded-full cursor-pointer text-sm"
                    onClick={()=>{
                      MovieDetails(movie.id)
                    }}
                    
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
             })
        }
             

            </div>
  )
}
