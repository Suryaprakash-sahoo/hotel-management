import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { Textarea } from "../Components/ui/textarea";
import { Label } from "../Components/ui/label";
import { Plus, Minus } from "lucide-react";
import '../index.css'

function Order() {
  const { tableId } = useParams();

  const [table, setTable] = useState({});
  const [food, setFood] = useState([]);
  const [formData, setFormData] = useState({
    customerNotes: "",
    items: [],
  });

  /* ---------------- ADD TO ORDER ---------------- */
  const addToOrder = (item) => {
    setFormData((prev) => {
      const items = [...prev.items];
      const idx = items.findIndex((i) => i._id === item._id);

      if (idx > -1) {
        items[idx] = { 
          ...items[idx], 
          quantity: items[idx].quantity + 1 
        };
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

  /* ---------------- QUANTITY CONTROLS ---------------- */
  const incrementItem = (id) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i._id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    }));
  };

  const decrementItem = (id) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items
        .map((i) =>
          i._id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0),
    }));
  };

  /* ---------------- NOTES ---------------- */
  const handleNotesChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      customerNotes: e.target.value,
    }));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting order:", formData);
    // axios.post("/api/order", formData)
  };

  /* ---------------- FETCH TABLE ---------------- */
  useEffect(() => {
    if (!tableId) return;

    const fetchTable = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/waiter/tableId/${tableId}`,
          { withCredentials: true }
        );
        setTable(res.data.table);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTable();
  }, [tableId]);

  /* ---------------- FETCH FOOD ---------------- */
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9000/api/waiter/AllFood",
          { withCredentials: true }
        );
        setFood(res.data.allFood);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFood();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-[calc(100vh-2rem)]">
          
          {/* LEFT — ORDER SUMMARY (Fixed height section) */}
          <div className="lg:w-2/5 flex flex-col">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-y-auto flex flex-col h-full">
              <div className="p-4 lg:p-6 bg-gradient-to-r from-blue-600 to-blue-500">
                <h2 className="text-xl lg:text-2xl font-bold text-white">Table #{table?.tableNumber || "Loading"}</h2>
                <p className="text-blue-100 text-sm">Customer: {table?.occupiedByName || "N/A"}</p>
                 <p className="text-blue-100 text-sm">Customer: {table?.occupiedByNumber || "N/A"}</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col flex-1 p-4 lg:p-2">
                
                {/* Customer Info */}
                

                {/* Customer Notes */}
                <div className="mb-4 lg:mb-6">
                  <Label className="text-gray-700 font-medium mb-2 block">Customer Notes</Label>
                  <Textarea
                    value={formData.customerNotes}
                    onChange={handleNotesChange}
                    className="bg-gray-50 min-h-[100px] resize-none"
                    placeholder="Any special requests or dietary restrictions?"
                  />
                </div>

                {/* Order Items Section - FLEXIBLE SCROLL AREA */}
                <div className="mb-4 lg:mb-6 flex-1 min-h-0 flex flex-col scroll"> {/* Crucial: min-h-0 allows flex child to shrink */}
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">Order Items</h3>
                    {formData.items.length > 0 && (
                      <span className="text-sm text-gray-500">
                        {formData.items.length} item{formData.items.length !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>

                  {/* Scrollable items container (flex-1) */}
                  <div className="border border-gray-200 rounded-lg bg-gray-50 p-3 overflow-y-auto flex-1"> {/* Flexible scroll area */}
                    {formData.items.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="text-gray-400 mb-2">🛒</div>
                        <p className="text-gray-500">No items added yet</p>
                        <p className="text-sm text-gray-400 mt-1">Add items from the menu</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {formData.items.map((item) => (
                          <div
                            key={item._id}
                            className="bg-white rounded-lg p-1 shadow-sm border border-gray-100 overflow-hidden"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <p className="font-medium text-gray-800">{item.name}</p>
                                <p className="text-gray-600 text-sm">₹{item.price} × {item.quantity}</p>
                                <p className="text-gray-900 font-medium text-sm mt-1">
                                  ₹{item.price * item.quantity}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  onClick={() => decrementItem(item._id)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                
                                <span className="text-gray-800 font-medium min-w-[24px] text-center">
                                  {item.quantity}
                                </span>
                                
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  onClick={() => incrementItem(item._id)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Total & Actions */}
                <div className="mt-auto pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700 font-medium">Total Items:</span>
                    <span className="text-gray-900 font-bold">
                      {formData.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      disabled={formData.items.length === 0}
                    >
                      Submit Order
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setFormData({customerNotes: "", items: []})}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT — FOOD MENU (Responsive grid) */}
          <div className="lg:w-3/5 flex flex-col">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col h-full">
              <div className="p-4 lg:p-6 border-b border-gray-200">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">Menu Items</h2>
                <p className="text-gray-600">Select items to add to the order</p>
              </div>

              {/* Food Grid - Responsive and scrollable */}
              <div className="flex-1 p-4 lg:p-6 overflow-hidden"> {/* Prevent outer overflow */}
                <div className="h-full overflow-y-auto pr-2"> {/* Scrollable container */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
                    {food.map((item) => (
                      <div
                        key={item._id}
                        className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                      >
                        {item.imageUrl && (
                          <div className="h-40 overflow-hidden">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-gray-800 line-clamp-1">{item.name}</h3>
                            <span className="text-green-600 font-bold">₹{item.price}</span>
                          </div>
                          
                          {item.description && (
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                          
                          <Button
                            type="button"
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                            onClick={() => addToOrder(item)}
                          >
                            Add to Order
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;