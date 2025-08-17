import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBooking } from "./bookingcotext"; // ✅ use context
import { seats_AB, seats_EF, seats_GH, seats_IJ } from "../components/Seatesdata";

export default function SelectionPage() {
  const { id, selectedDate: paramDate } = useParams();
  const [selectedDate, setSelectedDate] = useState(paramDate || "");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  // ✅ now pulling bookingData + setter from context
  const { selectedtiming, bookingData, setBookingData , addBooking  } = useBooking();

  useEffect(() => {
    if (bookingData && !paramDate) {
      setSelectedDate(bookingData.date);
      setSelectedSeats(bookingData.seats || []);
    }
  }, [paramDate, bookingData]);

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const SeatGroup = ({ seats }) => (
    <div className="flex flex-col p-1 ml-0 sm:p-4 pl-0 gap-2 md:gap-5">
      {seats.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1.5 sm:gap-2 md:gap-3">
          {row.map((seat) => (
            <div
              key={seat}
              onClick={() => toggleSeat(seat)}
              className={`
                border text-[8px] w-4 h-4.5 flex items-center justify-center rounded-md sm:text-xs
                md:w-8 md:h-8 md:text-sm sm:w-6 sm:h-6
                border-red-950 cursor-pointer transition
                ${
                  selectedSeats.includes(seat)
                    ? "bg-red-600 text-white"
                    : "border-red-950 text-gray-200 hover:bg-red-500"
                }
              `}
            >
              {seat}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const handleBooking = () => {
  if (!selectedtiming || selectedSeats.length === 0) {
    alert("❌ Please choose a timing and at least one seat before booking!");
    return;
  }

  const newBooking = {
    movieId: id,
    seats: selectedSeats,
    date: selectedDate,
    timing: selectedtiming,
  };

  addBooking(newBooking); // ✅ adds to array

  // Navigate to MyBooking page
  navigate("/MyBooking", { state: newBooking });
};


  return (
    <>
      <div className="pt-10 md:gap-3 md:justify-center md:p-5 md:pt-20 md:pr-10 md:pl-0">
        <div className="flex justify-center md:mx-55 md:mb-4 md:p-5">
          <SeatGroup seats={seats_AB} />
        </div>
        <div className="flex justify-around mt- p-1 md:justify-between md:mr-[20px]">
          <SeatGroup seats={seats_EF} />
          <SeatGroup seats={seats_GH} />
        </div>
        <div className="flex justify-around mt- p-1 md:justify-between md:mr-[20px]">
          <SeatGroup seats={seats_IJ} />
          <SeatGroup seats={seats_IJ} />
        </div>
      </div>

      <button
        onClick={handleBooking}
        className="h-9 w-24 mt-10 rounded-md md:px-5 md:py-2 md:mt-10 bg-red-500 text-white md:rounded-lg hover:bg-red-600 mx-auto block"
      >
        Book Now
      </button>
    </>
  );
}

