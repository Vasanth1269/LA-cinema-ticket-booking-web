
import { FaRegClock } from "react-icons/fa";
import { useBooking } from "./bookingcotext";


export default function ChooseTiming() {
      const dates = ["8:30", "11:30", "4:30"];
  
  
  const { selectedtiming, setSelectedtiming } = useBooking();
  console.log("timing",selectedtiming)


  return (
    <>
    <div className='p-4 pl-0'>
        {dates.map((timing)=>{
            return(
           <span className={`flex  p-2 w-29 hover:bg-red-900 hover:rounded-md
            ${
                selectedtiming === timing
                  ? "bg-red-900 text-white rounded-md"
                  : " text-white"
              }
            `}
           onClick={() => setSelectedtiming(timing)}
           key={timing}
           >
                  <FaRegClock className="text-white text- my-1 mr-3 " /> {timing}
                </span>
            )
        })}
                
                
              </div>
    
    </>
    
  );
}