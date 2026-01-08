import React from 'react'
import Logo from '../assets/Logo.png'
import Navbar from "../Components/Navbar.jsx"

function Page1() {
  return (
    <>
     <div className="home h-screen w-full flex  items-center flex-col bg-gradient-to-br from-black to-gray-400">
       <Navbar />
      <img src={Logo} alt="logo" className="object-contain" />
      <h1 className='text-white text-7xl font-bold'>What you Want, We Deliver!!</h1>
      <p className=' text-lg text-white text-center mt-6 px-16 leading-tight'>You dream it, we make it happen. From fast service to premium quality, everything we deliver is built around your
         vibe and your needs. No delays, no compromises—just smooth execution, clean results, and experiences that actually 
         hit different. Whether it’s a product, service, or solution, we focus on doing it right, every single time.</p>

         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl mt-6 w-90">Explore Our Products</button>
    </div>
    </>
    
  )
}

export default Page1

