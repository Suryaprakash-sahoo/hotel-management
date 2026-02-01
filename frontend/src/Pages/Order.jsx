import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { Textarea } from "../Components/ui/textarea";
import { Label } from "../Components/ui/label";

function Order() {
  const { tableId } = useParams();
  const [table, setTable] = useState({});
  const [food, setFood] = useState([]);
  const [formData, setFormData] = useState({
    customerNotes: "",
    items: []
  });

  // Add item to order (if it already exists, increase quantity)
  const addToOrder = (item) => {
    setFormData((prev) => {
      const items = [...prev.items];
      const idx = items.findIndex((i) => i._id === item._id);
      if (idx > -1) {
        items[idx] = { ...items[idx], quantity: items[idx].quantity + 1 };
      } else {
        items.push({
          _id: item._id,
          name: item.name,
          price: item.price,
          description: item.description || "",
          quantity: 1,
        });
      }
      return { ...prev, items };
    });
  };

  const incrementItem = (id) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((i) => (i._id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    }));
  };

  const decrementItem = (id) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items
        .map((i) => (i._id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    }));
  };

  const handleNotesChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, customerNotes: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting order:", formData);
    // TODO: send order to backend
  };

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/waiter/tableId/${tableId}`,
          { withCredentials: true }
        );

        setTable(response.data.table);
      } catch (error) {
        console.log(error);
      }
    };

    if (tableId) fetchTable();
  }, [tableId]);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/waiter/AllFood",
          { withCredentials: true }
        );
        // console.log(response.data.allFood);
        setFood(response.data.allFood);

      } catch (error) {
        console.error(error);
      }
    };
    fetchFood();
  }, []);

  return (
    <div className="relative min-h-screen w-screen overflow-hidden">

      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-16 -left-12 h-[250px] w-[250px] rounded-full bg-red-500" />
        <div className="absolute top-32 left-32 h-[250px] w-[250px] rounded-full bg-yellow-300" />
        <div className="absolute top-12 right-12 h-[250px] w-[250px] rounded-full bg-blue-500" />
        <div className="absolute top-[29rem] -left-12 h-[250px] w-[250px] rounded-full bg-green-500" />
        <div className="absolute top-[32rem] left-[40rem] h-[250px] w-[250px] rounded-full bg-purple-500" />
      </div>

      {/* Blur overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[40px] z-0" />

      {/* Main layout */}
      <div className="OrderPage relative z-10 flex flex-col md:flex-row gap-6 p-6 min-h-screen">

        {/* LEFT — Order Form */}
        <div className="w-full md:w-1/3 flex flex-col h-[calc(100vh-3rem)]">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 shadow-lg flex-1 overflow-y-auto">


            <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-white">
                  Order Your Foods
                </h3>

                <div className="space-y-4">
                  <div>
                    <Label className="text-white">Customer Name</Label>
                   <h1 className="text-white" > Food name - {formData.items.length > 0 ? formData.items[0].name : "None"}</h1>
                  </div>

                  <div>
                    <Label className="text-white">Customer Number</Label>
                    <Input
                      value={table?.occupiedByNumber || ""}
                      readOnly
                      className="mt-2 text-black"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-white">Customer Notes</Label>
                <Textarea
                  placeholder="write what you want to eat!!"
                  className="resize-none mt-2 text-black h-32"
                  rows={4}
                  value={formData.customerNotes}
                  onChange={handleNotesChange}
                />
              </div>

              <div className="h-40 w-110 bg-transparent rounded-md p-2 border-2 border-white overflow-auto">
                {formData.items.length === 0 ? (
                  <p className="text-white">No items in order</p>
                ) : (
                  <div className="space-y-3">
                    {formData.items.map((item) => (
                      <div key={item._id} className="flex items-start justify-between bg-white/10 p-2 rounded">
                        <div>
                          <div className="text-white font-semibold">{item.name}</div>
                          <div className="text-sm text-gray-200">₹{item.price}</div>
                          <div className="text-xs text-gray-300">{item.description}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" className="px-2 py-1" onClick={() => decrementItem(item._id)}>-</Button>
                          <div className="text-white">{item.quantity}</div>
                          <Button variant="outline" className="px-2 py-1" onClick={() => incrementItem(item._id)}>+</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-auto pt-4">
                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    Submit
                  </Button>
                  <Button variant="outline" type="button" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT — Food Items */}
        <div className="w-full md:w-2/3 flex flex-col h-[calc(100vh-3rem)]">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg flex-1 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Food Items</h2>

            {/* Dummy content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {food.length === 0 ? (
                <p className="text-gray-600">No food available</p>
              ) : (
                food.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-lg shadow hover:shadow-xl transition p-4 flex flex-col"
                  >
                    {/* Food Image */}
                    <img
                      src={item.imageUrl}
                      alt={item.foodName}
                      className="h-40 w-full object-cover rounded-md mb-3"
                    />

                    {/* Food Info */}
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      ₹{item.price}
                    </p>

                    {/* Add Button */}
                    <Button className="mt-auto" onClick={() => addToOrder(item)}>
                      Add to Order
                    </Button>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Order;