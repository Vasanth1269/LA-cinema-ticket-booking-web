import React from 'react'

import { Link } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/logo.svg'
import menu from '../assets/menuicon.png'
import { FaSearch } from "react-icons/fa";




export const Navibar = () => {
   const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
     <div className="  fixed top-0 left-0 w-full z-10 cursor-pointer  shadow-md px-5 md:px-10 lg:px-40 flex justify-between items-center py-4">
  <div className="flex md:ml-1">
    <Link to = '/'>
     <img src={logo} alt="" />
    </Link>
   
  
  </div>
  <div className =" hidden md:flex backdrop-blur-md bg-white/10 w-[350px] p-4 justify-center gap-5 rounded-full border-1 border-gray-500 transition ease-in-out ">
    <a href='/' className="text-white hover:text-red-500 cursor-pointer" >Home</a>
    <a href='/Movie' className="text-white hover:text-red-500 cursor-pointer" >Movies</a>
    <a href=''className="text-white hover:text-red-500 cursor-pointer" >Theaters</a>
    <a href='/Favorite' className="text-white hover:text-red-500 cursor-pointer" >Favoirtes</a>
  </div>

  <div className="hidden md:flex items-center gap-4">
     <FaSearch style={{ marginRight: "w-8 h-7 cursor-pointer" }} />
          <button className="bg-red-500 text-white px-4 py-2 rounded-3xl w-[100px] cursor-pointer">Login</button>
        </div>
    <div className='md:hidden cursor-pointer' onClick={()=>{setMenuOpen(!menuOpen)}}>
       <img src={menu} alt="Menu" className='w-[60px]' />
    </div>

</div>
  
  { menuOpen && <div onClick={()=>{setMenuOpen(!menuOpen)}} className= "fixed top-0 left-0 w-full h-full z-50 flex flex-col items-center justify-center space-y-8 backdrop-blur-md bg-white/10" >
      <a href='/' className="text-white hover:text-red-500 cursor-pointer" >Home</a>
    <a href='/Movie' className="text-white hover:text-red-500 cursor-pointer" >Movies</a>
    <a href=''className="text-white hover:text-red-500 cursor-pointer" >Theaters</a>
    <a href='/Favorite' className="text-white hover:text-red-500 cursor-pointer" >Favoirtes</a>
  </div>}
</>
  )
}

  
