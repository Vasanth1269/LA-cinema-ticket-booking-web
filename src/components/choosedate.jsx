import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function DateSelection({movieId}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
   const id = movieId
  // Generate next 7 days dynamically
  const dates = Array.from({ length: 4 }, (_, i) =>
    dayjs().add(i, "day").format("MMM DD")
  );

  const handleBooking = () => {
    if (!selectedDate) {
      alert("Please choose a date before booking.");
      return;
    }

    // Pass selected date to next page
    navigate(`/Movie/${id}/${selectedDate}`);
  };

console.log(selectedDate)

  return (
    <>
  
   
              <div >
                <span className='mx-7'>Choose Date</span>
                <div className=' flex gap-6 p-5 justify-center md:flex md:gap-6 md:justify-start md:p-5'>
                  <span className='my-auto text-2xl '>&lt;</span>
                     {dates.map((date)=>{
      return (
       <div key={date} 
       className={`border-none  cursor-pointer w-12 h-18 pt-4  rounded-md ${
              selectedDate === date ? "bg-red-800 text-white" : "bg-red-700/10"
            } `}
       
       onClick={() => setSelectedDate(date)}
       >
                <span className=' flex mb-7 ml-2.5  '>{date}</span>

              </div>
      )
    })}
                  
                  
                  <span className='my-auto text-2xl'>&gt;</span>
                </div>
              </div>
               <div className='mt-11 md:mt-10  md:mx-110 '
       onClick={handleBooking}
       >

            <button className=' p-2 w-33 rounded-md mx-45 md:p-2 md:w-33 bg-red-800 md:rounded-md md:cursor-pointer hover:bg-red-900'>booking date</button>
          </div>
              
    
    
            
   

      
    
   </>
  );
}
