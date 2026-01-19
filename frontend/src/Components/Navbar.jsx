import React, { useEffect, useState } from 'react'
import Res from "../assets/Res.png"
import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Components/ui/dialog"
import { Button } from "../Components/ui/button"
import { Input } from "../Components/ui/input"
import { Label } from "../Components/ui/label"

function Navbar() {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
  })

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

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

        <button className='text-white font-bold'>Home</button>
        <button className='text-white font-bold'>About</button>
        <button className='text-white font-bold'>Contact</button>

        {/* 🔥 BOOK NOW DIALOG */}
        <Dialog>
          <DialogTrigger asChild>
            <button className='text-white font-bold hover:text-gray-300'>
              Book Now
            </button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Book a Table</DialogTitle>
              <DialogDescription>
                Fill the form to reserve your table.
              </DialogDescription>
            </DialogHeader>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="date">Booking Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" className="w-full">
                Confirm Booking
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <button
          className='text-white font-bold'
          onClick={() => navigate('/auth')}
        >
          Login
        </button>

        <button className='text-white text-xl'>
          <i className="fa-solid fa-circle-user"></i>
        </button>
      </div>
    </div>
  )
}

export default Navbar
