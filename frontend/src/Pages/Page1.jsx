import React from 'react'
import Logo from '../assets/Logo.png'
import Navbar from "../Components/Navbar.jsx"

function Page1() {
  return (
    <>
     <div className="home min-h-screen w-full flex items-center justify-center flex-col bg-gradient-to-br from-black to-gray-400 px-4 py-8 sm:px-6 sm:py-12">
       <Navbar />
      <img src={Logo} alt="logo" className="object-contain w-32 sm:w-40 md:w-48 mt-4 sm:mt-6" />
      <h1 className='text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mt-4 sm:mt-6'>What you Want, We Deliver!!</h1>
      <p className='text-sm sm:text-base md:text-lg text-white text-center mt-4 sm:mt-6 px-4 sm:px-6 md:px-8 max-w-4xl leading-tight'>You dream it, we make it happen. From fast service to premium quality, everything we deliver is built around your
         vibe and your needs. No delays, no compromises—just smooth execution, clean results, and experiences that actually 
         hit different. Whether it's a product, service, or solution, we focus on doing it right, every single time.</p>

         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-2xl mt-6 sm:mt-8 text-sm sm:text-base">Explore Our Products</button>
    </div>
    </>
    
  )
}

export default Page1

