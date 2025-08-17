import React from "react";
import { useBooking } from "../components/bookingcotext";

export const MyBooking = ({ movies }) => {
  const { relatedMovies, bookingData } = useBooking();
   const booking = bookingData
  return (
    <div className="flex-row  relative min-h-screen bg-black overflow-hidden text-white">
      <div className="absolute top-10 left-40 w-[300px] h-[300px] bg-red-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-[300px] h-[300px] bg-red-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

        <div className="flex   flex-col">

        
        {bookingData.length === 0 ? (
          <p className="text-center py-10">❌ No bookings yet</p>
        ) : (
          booking.map((bok, index) => {
            let movie =
              movies.find((m) => String(m.id) === String(bok.movieId)) ||
              relatedMovies.find((m) => String(m.id) === String(bok.movieId));

            if (!movie) return null; // safety check

            return (
              
              <div key={index} className="reddrop-blur-md mt-48 w-90 mx-auto md:ml-48 bg-red-700/10 md:w-[800px]  gap-5 rounded-lg">
              <div
                
                className="md:flex flex-col md:flex-row pt-1 "
              >
                {/* Movie Poster */}
                <img
                  src={movie.poster}
                  alt="poster"
                  className="w-50 p-2 rounded-2xl h-40 object-cover mx-auto md:w-50 md:p-3 md:h-40 md:object-cover md:ml-0"
                />

                {/* Booking Details */}
                <div className="flex flex-row gap-15 md:gap-60 pr-6 md:items-center p-6">
                  <div className="flex flex-col">
                    <span className="font-bold md:text-lg md:my-3">
                      {movie.title}
                    </span>
                    <span className="font-light text-gray-400">
                      {movie.duration}
                    </span>
                    <span className="font-light text-gray-400">
                      {bok.date} at {bok.timing}
                    </span>
                  </div>

                  <div className="flex flex-col mx-0.5 md:flex-col">
                    <span className="font-bold md:text-2xl md:mx-3 md:my-5">
                      $796
                    </span>
                    <span className="font-light text-gray-400">
                      Tickets: {bok.seats.length}
                    </span>
                    <span className="font-light text-md text-gray-400">
                      Seat: {bok.seats.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};



