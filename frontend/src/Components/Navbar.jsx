import React, { useEffect, useState } from 'react'
import Res from "../assets/Res.png"

function Navbar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShow(true)
      } else {
        setShow(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`
        fixed top-6 left-1/2 -translate-x-1/2 z-50
        h-15 w-[75%] rounded-full
        bg-black/10 backdrop-blur-md
        shadow-[8px_10px_20px_-8px_rgba(255,255,255,0.7)]
        flex items-center justify-between
        transition-all duration-500 ease-in-out
        ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}
      `}
    >
      <img src={Res} alt="Logo" className='ml-4 h-10 w-10' />

      <div className='flex space-x-4 mr-4'>
        <button className='text-white font-bold hover:text-gray-300'>Home</button>
        <button className='text-white font-bold hover:text-gray-300'>About</button>
        <button className='text-white font-bold hover:text-gray-300'>Contact</button>
        <button className='text-white font-bold hover:text-gray-300'>Book Now</button>
        <button className='text-white font-bold hover:text-gray-300'>Login</button>
        <button className='text-white text-xl'>
          <i className="fa-solid fa-circle-user"></i>
        </button>
      </div>
    </div>
  )
}

export default Navbar
