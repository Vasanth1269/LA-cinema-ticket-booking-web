import React from 'react'

import screen from '../assets/screenImage.svg'
import ChooseTiming from '../components/seletTiming';
import SelectionPage from '../components/seletseats';


export const SetSelection = () => {


  return (
    <div className='flex flex-col md:flex-row relative bg-black overflow-hidden text-white w-full
'>
      <div class="absolute top-10 left-40 w-[400px] h-[300px] bg-red-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div class="absolute bottom-10 right-0 w-[300px] h-[300px] bg-red-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className='  mt-20 flex p-20   bg-black overflow-hidden md:p-50  md:pr-5 text-white'>
        <div className='reddrop-blur-md bg-red-700/10 h-70 w-[300px] gap-5 p-8 pl-2  rounded-lg '>
          <span>Available Timings</span>
         <ChooseTiming />
        </div>
      </div>
      <div className='realtiv'>
        <div className=' pt-0 md:pt-30'>
        <div className="p-5 pb-0">
  <h1 className="text-2xl text-center my-2">Select Your Seat</h1>
  <img src={screen} alt="Screen" className="mx-auto" />
  <h1 className="flex justify-center text-gray-500 text-lg">Screen Side</h1>
</div>


          {/* Seats Layout */}
          <SelectionPage />
        </div>
      </div>
    </div>
  )
}

