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

import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
} from "../Components/ui/combobox"
import { Button } from "../Components/ui/button"
import { Input } from "../Components/ui/input"
import { Label } from "../Components/ui/label"

function Main() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("")
  const [bill, setBill] = useState(null);
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
      await axios.post(`https://hotel-management-vnsc.onrender.com/api/waiter/cancelBooking/${clickTable.tableNumber}`, {}, { withCredentials: true });
      toast.success("Booking cancelled successfully!")
    } catch {
      toast.error("Failed to cancel booking.")
    }
  }

  const HandleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://hotel-management-vnsc.onrender.com/api/waiter/createOrder/${clickTable._id}`, formData, { withCredentials: true });
    } catch (error) {
      toast.error(`${error.message}`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("https://hotel-management-vnsc.onrender.com/api/waiter/bookTable", formData, { withCredentials: true });
      toast.success("Table booked successfully!")
    } catch {
      toast.error("Failed to book table.")
    }
  }

  const handleBy = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`https://hotel-management-vnsc.onrender.com/api/waiter/bookTable/${clickTable.tableNumber}`, formData, { withCredentials: true });
      toast.success("Table booked successfully!")
    } catch {
      toast.error("Failed to book table.")
    }
  }

  const HandleClick = async (table) => {
    try {
      const response = await axios.get(`https://hotel-management-vnsc.onrender.com/api/waiter/tableStatus/${table.tableNumber}`, { withCredentials: true });
      setClickTable(response.data.table);
    } catch (error) {
      console.log(error)
    }
  }

  const HandleOrder = async () => {
    try {
      const response = await axios.get(`https://hotel-management-vnsc.onrender.com/api/waiter/orderDetails/${clickTable.orderId}`, { withCredentials: true });
      setOrder(response.data.order);
    } catch {
      toast.error("Failed to get orders.")
    }
  }

  const HandleUpdation = async () => {
    try {
      const response = await axios.post(`https://hotel-management-vnsc.onrender.com/api/receptionist/confirmPayment/${clickTable.orderId}`, { paymentThrough: paymentMethod }, { withCredentials: true });
      setBill(response.data.bill._id);
      toast.success("Payment status updated successfully!")
    } catch {
      toast.error("Failed to update payment status.")
    }
  }

  const HandleAssign = async () => {
    try {
      await axios.post(`https://hotel-management-vnsc.onrender.com/api/receptionist/updateTableStatus/${clickTable._id}`, {}, { withCredentials: true });
      setClickTable(null);
      setOrder(null);
      setBill(null);
      setPaymentMethod("");
      setFormData({ tableNumber: "", occupiedByName: "", occupiedByNumber: "" })
      window.location.reload();
      toast.success("Table is ready for the next customer!")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchTables = async () => {
      const response = await axios.get("https://hotel-management-vnsc.onrender.com/api/waiter/AllTables", { withCredentials: true });
      setTables(response.data.tables);
    };
    fetchTables();
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      <div className="min-h-screen w-full bg-gradient-to-b from-black to-gray-600 flex flex-col">

        {/* NAV */}
        <div className='w-full flex justify-center p-3'>
          <div className="h-12 w-[90%] lg:w-[75%] rounded-full bg-black/10 backdrop-blur-md flex items-center justify-between px-4">
            <img src={Res} className='h-8 w-8' />
            <div className='flex gap-3 text-white'>
              <button>Home</button>
              <button>About</button>
              <button>Contact</button>
            </div>
          </div>
        </div>

        {/* MAIN LAYOUT FIXED */}
        <div className="flex flex-1 flex-col lg:flex-row gap-3 px-3 pb-3 overflow-hidden">

          {/* LEFT */}
          <div className="flex flex-col gap-3 flex-1 min-h-0">

            {/* TABLES */}
            <div className="bg-white/5 rounded-lg p-3">
              <h3 className="text-white mb-2">Tables Layout</h3>
              <div className="flex flex-wrap gap-2">
                {tables.map((table) => (
                  <div
                    key={table._id}
                    onClick={() => HandleClick(table)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${table.occupied ? 'bg-red-500' : 'bg-green-500'}`}
                  >
                    <span className="text-white text-xs">{table.tableNumber}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ORDER */}
            <div className="flex-1 bg-black rounded-lg overflow-auto p-3">
              {clickTable ? (
                order && order.items.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {order.items.map((item, i) => (
                      <div key={i} className="bg-white/10 p-2 rounded text-white">
                        {item.dish.name} × {item.qty}
                      </div>
                    ))}

                    <button className="bg-green-500 p-2 rounded" onClick={HandleUpdation}>
                      Make Payment
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-400 text-center">No order</p>
                )
              ) : (
                <p className="text-gray-400 text-center">Select table</p>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR FIXED */}
          <div className="w-full lg:w-[320px] xl:w-[350px] bg-white/10 rounded-lg p-3 flex flex-col gap-3 overflow-auto flex-shrink-0">

            {clickTable ? (
              <>
                <h2 className="text-white text-xl text-center font-bold">Table Details</h2>

                <div className="bg-white/20 p-2 rounded text-white">
                  <p>Table: {clickTable.tableNumber}</p>
                  <p>Type: {clickTable.type}</p>
                  <p>Capacity: {clickTable.capacity}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <button className="bg-purple-500 p-2 rounded" onClick={HandleOrder}>Explore Order</button>
                  <button className="bg-red-500 p-2 rounded" onClick={HandleCancel}>Cancel Booking</button>
                  <button className="bg-green-500 p-2 rounded" onClick={() => navigate(`/order/${clickTable._id}`)}>Order Food</button>
                </div>
              </>
            ) : (
              <div className="text-white text-center">No table selected</div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default Main;