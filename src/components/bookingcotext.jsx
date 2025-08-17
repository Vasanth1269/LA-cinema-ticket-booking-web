import { createContext, useState, useContext, useEffect } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [selectedtiming, setSelectedtiming] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [bookingData, setBookingData] = useState([]); // <-- NEW

  // Load data from localStorage on start
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const storedBookings = JSON.parse(localStorage.getItem("bookingData")) || [];
    setFavorites(storedFavorites);
    setBookingData(storedBookings);
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Save to localStorage whenever bookingData changes
  useEffect(() => {
    localStorage.setItem("bookingData", JSON.stringify(bookingData));
  }, [bookingData]);

  // Toggle favorites
  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  // Add new booking
  const addBooking = (newBooking) => {
    setBookingData((prev) => [...prev, newBooking]);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedtiming,
        setSelectedtiming,
        relatedMovies,
        setRelatedMovies,
        favorites,
        toggleFavorite,
        bookingData,
        addBooking, // expose function
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
