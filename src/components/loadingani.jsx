import { useState, useEffect } from "react";

export default function MovieList({ movies }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading || movies.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-500 border-solid"></div>
        <span className="ml-3 text-amber-100">Loading...</span>
      </div>
    );
  }

  
}
