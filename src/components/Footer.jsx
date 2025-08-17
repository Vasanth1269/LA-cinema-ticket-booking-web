import React from 'react'
import logo from '../assets/logo.svg'
import playstore from '../assets/googlePlay.svg'
export const Footer = () => {
  return (

 <>
<div className="flex  flex-col min-h-[700px] bg-black text-white">
  {/* Main content */}
  <main className="flex-grow">
    {/* Your video grid here */}
  </main>

  {/* Footer */}
  <footer className="bg-black  border-t border-gray-700">
    <div className="max-w-7xl mx-auto px-6 py-10 grid sm:grid-cols-1 md:grid-cols-3 gap-8 h-80">
      {/* Left */}
      <div className='mt-10'>
        <img src={logo} alt="logo" className='w-30' />
        <p className="mt-3 text-gray-400 text-sm">
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
        <div className="flex space-x-3 mt-4">
          <img src={playstore} alt="Google Play" className="h-10" />
        </div>
      </div>

      {/* Middle */}
      <div className='mt-10'>
        <h3 className="font-semibold text-lg mb-3">Company</h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li>Home</li>
          <li>About us</li>
          <li>Contact us</li>
          <li>Privacy policy</li>
        </ul>
      </div>

      {/* Right */}
      <div className='mt-10'>
        <h3 className="font-semibold text-lg mb-3">Get in touch</h3>
        <p className="text-gray-400 text-sm">+1-234-567-890</p>
        <p className="text-gray-400 text-sm">contact@example.com</p>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">
      Copyright © 2025 GreatStack. All rights reserved.
    </div>
  </footer>
</div>



 </>


  )
}
