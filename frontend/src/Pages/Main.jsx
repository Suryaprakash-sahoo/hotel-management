import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Res from '../assets/Res.png'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
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

function Main() {
  const [tables, setTables] = useState([]);
  const [user, setUser] = useState(null);
  const [clickTable, setClickTable] = useState(null);
  const [formData, setFormData] = useState({
    tableNumber: "",
    occupiedByName: "",
    occupiedByNumber: "",
  })


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:9000/api/waiter/bookTable", formData, { withCredentials: true });
        toast.success("Table booked successfully!")
      
    } catch (error) {
      toast.error("Failed to book table.")
    }
  }
  const HandleClick = async (table) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/waiter/tableStatus/${table.tableNumber}`,
        { withCredentials: true }

      );
      setClickTable(response.data.table);
      console.log(response.data.table);
    } catch (error) {
      console.log(error)
    }
  }

  const ClickDashboard = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/waiter/dashboard", { withCredentials: true });
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/waiter/AllTables",
          { withCredentials: true }
        );
        setTables(response.data.tables); // 🔥 store tables
      } catch (error) {
        console.error(error);
      }
    };
    fetchTables();
  }, []);

  return (

    <>
     <ToastContainer
    position="top-right"
    autoClose={3000}
    theme="dark"
  />
    <div className="container  h-screen w-full bg-gradient-to-b from-black to-gray-600">
      <div className='w-full flex justify-center p-5 '>
        <div
          className={`
              
              h-15 w-[75%] rounded-full
              bg-black/10 backdrop-blur-md
              shadow-[8px_10px_20px_-8px_rgba(255,255,255,0.7)]
              flex items-center justify-between
             
            `}
        >
          <img src={Res} alt="Logo" className='ml-4 h-10 w-10' />

          <div className='flex space-x-4 mr-4'>
            <button className='text-white font-bold hover:text-gray-300'>Home</button>
            <button className='text-white font-bold hover:text-gray-300'>About</button>
            <button className='text-white font-bold hover:text-gray-300'>Contact</button>
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
                    <Label htmlFor="tableNumber">Table Number</Label>
                    <Input
                      id="tableNumber"
                      name="tableNumber"
                      placeholder="Enter table number"
                      value={formData.tableNumber}
                      onChange={handleChange}
                    />
                  </div>

                

                  <div>
                    <Label htmlFor="occupiedByName">Customer Name</Label>
                    <Input
                      id="occupiedByName"
                      name="occupiedByName"
                      placeholder="John Doe"
                      value={formData.occupiedByName}
                      onChange={handleChange}
                    />
                  </div>


                  <div>
                    <Label htmlFor="occupiedByNumber">Contact Number</Label>
                    <Input
                      id="occupiedByNumber"
                      name="occupiedByNumber"
                      type="number"
                      placeholder="Enter number"
                      value={formData.occupiedByNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Confirm Booking
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            <button className='text-white text-xl' onClick={ClickDashboard}>
              <i className="fa-solid fa-circle-user"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="tableSection w-full p-4 flex flex-row items-start">
        <div className="flex flex-wrap gap-4 ">
          {tables.map((table, index) => (
            // Create a new row container after every 10 tables
            index % 10 === 0 && (
              <div key={`row-${index}`} className="w-full flex flex-wrap gap-4  mb-4">
                {tables.slice(index, index + 10).map((subTable) => (
                  <div
                    onClick={() => HandleClick(subTable)}
                    key={subTable._id}
                    className={`
                w-12 h-12 rounded-full cursor-pointer
                flex items-center justify-center
                transition-transform hover:scale-110
                ${subTable.occupied ? 'bg-red-500' : 'bg-green-500'}
              `}

                  >
                    <span className="text-white font-semibold text-sm">
                      {subTable.tableNumber}
                    </span>
                  </div>
                ))}
              </div>
            )
          ))}
        </div>
        <div className="box ml-4 h-110 w-240 bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
          {clickTable ? (
            <div className="p-4 flex flex-col">
              <h2 className="text-white flex text-3xl mt-2 justify-center font-extrabold">Table Details</h2>
              <div className="box h-20 w-full bg-white/20 rounded-lg mt-4 flex flex-col">
                <div className="table p-3 ">
                  <p className="text-white  ">Table Number: {clickTable.tableNumber}</p>
                  <p className="text-white">TableId : {clickTable._id}</p>
                </div>
                <div className="available h-10 w-full bg-black/10 flex flex-row items-center justify-between p-4 mt-4 rounded">
                  <p className="text-white">Available: </p>
                  <p className='text-white'>{clickTable.occupied ?
                    (
                      <button className="bg-red-500 text-white px-4 py-2 rounded-full">Occupied</button>
                    ) : (
                      <button className="bg-green-500 text-white px-4 py-2 rounded-full">Available</button>
                    )}</p>
                </div>
                <div className="content flex flex-row items-center justify-between">
                  <p className='mx-auto text-white mt-4 '>Type: {clickTable.type}</p>
                  <p className='mx-auto text-white mt-4 '>Capacity: {clickTable.capacity}</p>
                </div>
                <div className="content flex flex-row items-center justify-between">
                  <p className='mx-auto text-white mt-4 '>CostumerName: {clickTable.occupiedByName ? clickTable.occupiedByName : "--"}</p>
                  <p className='mx-auto text-white mt-4 '>PaymentStatus: {clickTable.paymentStatus ? "Not paid" : "--"}</p>
                </div>

                <div className="book">
                 
                  <Dialog>
              <DialogTrigger asChild>
                <button className="bg-blue-800 w-full text-white px-4 py-2 rounded-full mt-6">Book Now</button>
                
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

                 <div className='flex flex-col text-black text-lg mb-4'>
                  <p>Table Number: {clickTable.tableNumber}</p>
                  </div>

                

                  <div>
                    <Label htmlFor="occupiedByName">Customer Name</Label>
                    <Input
                      id="occupiedByName"
                      name="occupiedByName"
                      placeholder="John Doe"
                      value={formData.occupiedByName}
                      onChange={handleChange}
                    />
                  </div>


                  <div>
                    <Label htmlFor="occupiedByNumber">Contact Number</Label>
                    <Input
                      id="occupiedByNumber"
                      name="occupiedByNumber"
                      type="number"
                      placeholder="Enter number"
                      value={formData.occupiedByNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Confirm Booking
                  </Button>
                </form>
              </DialogContent>
                  </Dialog>
                </div>
                <div className='flex flex-row'>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-full mr-2 w-[50%] mt-4">Cancel Booking</button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-full w-[50%] mt-4">Create Order</button>
                </div>

              </div>
            </div>
          ) : (
            <div className="h-full w-full flex justify-center items-center flex-col">
              <p className="text-white font-extrabold text-2xl">No table selected</p>
              <p className="text-white">please select a table!</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
    
  );
}

export default Main;
