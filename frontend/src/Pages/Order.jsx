import React from "react";

import { Button } from "../Components/ui/button"
import { Input } from "../Components/ui/input"
import { Textarea } from "../Components/ui/textarea"
import { Label } from "../Components/ui/label"


function Order() {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden">

      <div className="absolute inset-0 -z-10">
        
        <div className="absolute -top-16 -left-12 sm:left-12 md:-top-24 md:left-12 h-28 w-28 sm:h-32 sm:w-32 md:h-[250px] md:w-[250px] rounded-full bg-red-500" />
        <div className="absolute top-12 left-12 sm:top-32 sm:left-32 md:top-52 md:left-92 h-28 w-28 sm:h-32 sm:w-32 md:h-[250px] md:w-[250px] rounded-full bg-yellow-300" />
        <div className="absolute top-2 right-12 sm:left-[50%] md:top-12 md:left-[47rem] h-24 w-24 sm:h-32 sm:w-32 md:h-[250px] md:w-[250px] rounded-full bg-blue-500" />
        <div className="absolute top-1/2 -left-8 sm:top-40 md:top-[29rem] md:-left-12 h-28 w-28 sm:h-32 sm:w-32 md:h-[250px] md:w-[250px] rounded-full bg-green-500" />
        <div className="absolute top-1/3 left-1/2 sm:left-[45%] md:top-[32rem] md:left-[40rem] h-28 w-28 sm:h-32 sm:w-32 md:h-[250px] md:w-[250px] rounded-full bg-purple-500" />
        <div className="absolute top-24 -right-12 sm:right-12 md:-top-36 md:left-[85rem] h-28 w-28 sm:h-32 sm:w-32 md:h-[250px] md:w-[250px] rounded-full bg-yellow-500" />
        <div className="absolute bottom-12 -right-8 sm:bottom-32 sm:right-12 md:top-[34rem] md:left-[85rem] h-28 w-28 sm:h-32 sm:w-32 md:h-[250px] md:w-[250px] rounded-full bg-red-500" />
        <div className="absolute bottom-1/3 right-0 sm:top-48 sm:right-12 md:top-64 md:left-[72rem] h-28 w-28 sm:h-32 sm:w-32 md:h-[250px] md:w-[250px] rounded-full bg-green-500" />
      </div>
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[20px] sm:backdrop-blur-[35px] md:backdrop-blur-[50px] z-0" />

      <div className="OrderPage relative z-10 flex flex-col md:flex-row gap-6 p-6">
        <div className="form w-full md:w-1/3">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Order Form</h2>
            <form className="space-y-6">
              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Order Your Foods</h3>
                <p className="text-sm text-gray-600">All transactions are secure and encrypted</p>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="card-name">Name</Label>
                    <Input
                      id="card-name"
                      placeholder="Evil Rabbit"
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="card-number">Costumer Number</Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      required
                      className="mt-2"
                    />
                    <p className="text-sm text-gray-600 mt-1">Enter your 10-digit card number</p>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div>
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                  id="comments"
                  placeholder="Add any additional comments"
                  className="resize-none mt-2"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <Button type="submit" className="flex-1">Submit</Button>
                <Button variant="outline" type="button" className="flex-1">Cancel</Button>
              </div>
            </form>
          </div>
        </div>
        <div className="food w-full md:w-2/3">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg h-full">
            <h2 className="text-2xl font-bold mb-6">Food Items</h2>
            {/* Add food items here */}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Order;
