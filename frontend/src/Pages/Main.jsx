import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Res from '../assets/Res.png'
import Emoji from '../assets/emoji.png'
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
  const navigate = useNavigate();


  const [tables, setTables] = useState([]);
  const [user, setUser] = useState(null);
  const [clickTable, setClickTable] = useState(null);
  const [order, setOrder] = useState(null);
  const [formData, setFormData] = useState({
    tableNumber: "",
    occupiedByName: "",
    occupiedByNumber: "",
  })




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const HandleCancel = async () => {
    try {
      const response = await axios.post(`http://localhost:9000/api/waiter/cancelBooking/${clickTable.tableNumber}`, {},
        { withCredentials: true });
      console.log(`Cancel booking request received for table ${clickTable.tableNumber}`);
      toast.success("Booking cancelled successfully!")
    } catch (error) {
      toast.error("Failed to cancel booking.")
    }
  }

  const HandleCreate = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post(`http://localhost:9000/api/waiter/createOrder/${clickTable._id}`, formData, { withCredentials: true });

    } catch (error) {
      toast.error(`${error.message}`)
    }
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

  const handleBy = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`http://localhost:9000/api/waiter/bookTable/${clickTable.tableNumber}`, formData, { withCredentials: true });
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

  const HandleOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/waiter/orderDetails/${clickTable.orderId}`, { withCredentials: true });
      setOrder(response.data.order);
      console.log(response.data.order)

    } catch (error) {
      console.log(error)
      toast.error("Failed to get orders.")
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
      <div className="container min-h-screen w-full bg-gradient-to-b from-black to-gray-600 flex flex-col">
        <div className='w-full flex justify-center p-3 sm:p-5 '>
          <div
            className={`
              h-12 sm:h-15 w-[90%] sm:w-[75%] rounded-full
              bg-black/10 backdrop-blur-md
              shadow-[8px_10px_20px_-8px_rgba(255,255,255,0.7)]
              flex items-center justify-between px-3 sm:px-0
            `}
          >
            <img src={Res} alt="Logo" className='h-8 sm:h-10 w-8 sm:w-10 ml-2 sm:ml-4' />

            <div className='flex gap-2 sm:space-x-4 mr-2 sm:mr-4'>
              <button className='text-white font-bold text-xs sm:text-base hover:text-gray-300 hidden sm:block'>Home</button>
              <button className='text-white font-bold text-xs sm:text-base hover:text-gray-300 hidden sm:block'>About</button>
              <button className='text-white font-bold text-xs sm:text-base hover:text-gray-300 hidden md:block'>Contact</button>
              <Dialog>
                <DialogTrigger asChild>
                  <button className='text-white font-bold text-xs sm:text-base hover:text-gray-300'>
                    Book
                  </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px] w-[95%]">
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
              <button className='text-white text-lg sm:text-xl' onClick={ClickDashboard}>
                <i className="fa-solid fa-circle-user"></i>
              </button>
            </div>
          </div>
        </div>


        <div className="w-full px-2 sm:p-4 flex flex-col lg:flex-row gap-2 sm:gap-4 flex-1 min-h-0" style={{ height: 'calc(100vh - 100px)' }}>
          {/* Left section - Takes full available height */}
          <div className="flex flex-col gap-2 sm:gap-4 flex-1 lg:flex-[2] h-full min-h-0">
            {/* Icons Section - Takes only the space it needs */}
            <div className="icons-section bg-white/5 backdrop-blur-sm rounded-lg p-2 sm:p-4">
              <h3 className="text-white text-sm sm:text-lg font-bold mb-2 sm:mb-3">Tables Layout</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {tables.map((table, index) => (
                  <div
                    onClick={() => HandleClick(table)}
                    key={table._id}
                    className={`
                      w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer
                      flex items-center justify-center
                      transition-transform hover:scale-110
                      ${table.occupied ? 'bg-red-500' : 'bg-green-500'}
                    `}
                  >
                    <span className="text-white font-semibold text-xs sm:text-sm">
                      {table.tableNumber}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Table Section Below Icons - Takes remaining height */}
           <div className="h-[500px] w-full bg-black rounded-xl overflow-hidden">
  {clickTable ? (
    <div className="h-full flex flex-col p-4">

      {order && order.items.length > 0 ? (
        <>
          {/* Scrollable Items Section */}
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-white shadow-lg"
                >
                  <img
                    src={item.dish.imageUrl}
                    alt={item.dish.name}
                    className="h-40 w-full object-cover rounded-lg"
                  />

                  <div className="mt-3 flex justify-between text-sm">
                    <p className="font-semibold">{item.dish.name}</p>
                    <p>Qty: {item.qty}</p>
                  </div>

                  <div className="mt-1 text-sm text-gray-300">
                    ₹ {item.dish.price}
                  </div>

                  <div className="mt-2 text-sm font-semibold text-green-400">
                    Subtotal: ₹ {item.totalAmount}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/20 pt-4 mt-4">
            {/* Total */}
            <div className="flex justify-between text-white font-semibold mb-3">
              <span>Total</span>
              <span>
                ₹{" "}
                {order.items.reduce(
                  (sum, item) => sum + item.dish.price * item.qty,
                  0
                )}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 transition-all px-4 py-2 rounded-lg text-white"
                onClick={() => navigate(`/add-item/${clickTable._id}`)}
              >
                Add More
              </button>

              <button
                disabled={order.items.length === 0}
                className={`w-full sm:w-auto px-4 py-2 rounded-lg text-white transition-all ${
                  order.items.length === 0
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={() => console.log("Make Bill")}
              >
                Make Bill
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex justify-center items-center text-center">
          <p className="text-gray-300 text-sm">
            Click on the explore button to view order details
          </p>
        </div>
      )}
    </div>
  ) : (
    <div className="h-full flex justify-center items-center text-center">
      <p className="text-gray-300 text-sm">
        Select a table to view details
      </p>
    </div>
  )}
</div>

          </div>
         

          {/* Right section - Fixed width on desktop, full on mobile */}
          <div className="table-details w-full sm:w-110 bg-white/10 backdrop-blur-md rounded-lg shadow-lg overflow-auto lg:flex-shrink-0">
            {clickTable ? (
              <div className="p-2 sm:p-4 flex flex-col">
                <h2 className="text-white flex text-xl sm:text-3xl mt-1 sm:mt-2 justify-center font-extrabold">Table Details</h2>
                <div className="box min-h-16 sm:h-20 w-full bg-white/20 rounded-lg mt-3 sm:mt-4 flex flex-col">
                  <div className="table p-2 sm:p-3">
                    <p className="text-white text-xs sm:text-sm">Table Number: {clickTable.tableNumber}</p>
                    <p className="text-white text-xs sm:text-sm">TableId: {clickTable._id}</p>
                  </div>
                </div>
                <div className="available min-h-10 w-full bg-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-4 mt-3 sm:mt-4 rounded gap-1 sm:gap-0">
                  <p className="text-white text-xs sm:text-base">Available:</p>
                  <p className='text-white'>
                    {clickTable.occupied ? (
                      <button className="bg-red-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm">Occupied</button>
                    ) : (
                      <button className="bg-green-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm">Available</button>
                    )}
                  </p>
                </div>
                <div className="content flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 sm:mt-4 gap-1 sm:gap-0">
                  <p className='text-white text-xs sm:text-sm'>Type: {clickTable.type}</p>
                  <p className='text-white text-xs sm:text-sm'>Capacity: {clickTable.capacity}</p>
                </div>
                <div className="content flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 sm:mt-4 gap-1 sm:gap-0">
                  <p className='text-white text-xs sm:text-sm'>Customer Name: {clickTable.occupiedByName ? clickTable.occupiedByName : "--"}</p>
                  <p className='text-white text-xs sm:text-sm'>Payment Status: {clickTable.paymentStatus ? "Not paid" : "--"}</p>
                </div>
                <div className="content flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 sm:mt-4 gap-1 sm:gap-0">
                  <p className='text-white text-xs sm:text-sm'>Amount to Pay: {clickTable.totalAmount ? clickTable.totalAmount : "--"}</p>
                  <p className='text-white text-xs sm:text-sm'>Order Id: {clickTable.orderId ? clickTable.orderId : "--"}</p>
                </div>

                <div className="book mt-4 sm:mt-6">
                  {clickTable.occupied ? (
                    <div className="flex flex-col ">
                      <div className='flex flex-col sm:flex-row gap-1 sm:gap-2'>
                        <button className="bg-red-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full flex-1 text-xs sm:text-sm" onClick={HandleCancel}>Cancel Booking</button>
                        {clickTable.orderId ? (
                          <button className="bg-green-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full flex-1 text-xs sm:text-sm" >Add More</button>
                        ) : (
                          <button className="bg-green-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full flex-1 text-xs sm:text-sm" onClick={() => { navigate(`/order/${clickTable._id}`) }}>Order Food !!</button>
                        )}

                      </div>
                      <div>
                        <button className=" w-full mt-4 bg-purple-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full flex-1 text-xs sm:text-sm" onClick={HandleOrder}>Explore the order</button>
                      </div>
                       <div>
                        <button className=" w-full mt-4 bg-purple-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full flex-1 text-xs sm:text-sm" >Make the Payment</button>
                      </div>
                    </div>

                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="bg-blue-800 w-full text-white px-4 py-2 rounded-full text-xs sm:text-sm">Book Now</button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] w-[95%]">
                        <DialogHeader>
                          <DialogTitle>Book a Table</DialogTitle>
                          <DialogDescription>
                            Fill the form to reserve your table.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleBy} className="space-y-4 mt-4">
                          <div className='flex flex-col text-black text-base sm:text-lg mb-4'>
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
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full w-full flex justify-center items-center flex-col p-3 sm:p-4">
                <p className="text-white font-extrabold text-lg sm:text-2xl mb-2">No table selected</p>
                <p className="text-white text-center text-xs sm:text-sm">Please select a table from the layout to view details</p>
              </div>
            )}
          </div>





        </div>
      </div>
    </>
  );
}

export default Main;