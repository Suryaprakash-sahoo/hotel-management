import React, { useState } from 'react'
import Bg from "../assets/bg.png"


function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  

  function LoginForm() {
    return (
      <div className="form-group flex flex-col mt-6 items-center">
        <h3 className="text-xl font-bold text-white">Login Form</h3>

        <input
          type="email"
          placeholder="Enter Email"
          className="mt-4 p-2 rounded-lg bg-white/20 text-white outline-none w-full"
        />

        <input
          type="password"
          placeholder="Password"
          className="mt-4 p-2 rounded-lg bg-white/20 text-white outline-none w-full"
        />

        <button className="mt-6 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 w-full">
          Login
        </button>
      </div>
    )
  }

  function RegisterForm() {
    return (
      <div className="form-group flex flex-col mt-6 items-center">
        <h3 className="text-xl font-bold text-white">Register Form</h3>

        <input
          type="email"
          placeholder="Enter Email"
          className="mt-4 p-2 rounded-lg bg-white/20 text-white outline-none w-full"
        />

        <input
          type="text"
          placeholder="Username"
          className="mt-4 p-2 rounded-lg bg-white/20 text-white outline-none w-full"
        />

        <input
          type="password"
          placeholder="Password"
          className="mt-4 p-2 rounded-lg bg-white/20 text-white outline-none w-full"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="mt-4 p-2 rounded-lg bg-white/20 text-white outline-none w-full"
        />

        <button className="mt-6 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 w-full">
          Register
        </button>
      </div>
    )
  }

  return (
    <div
      className="h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="h-[520px] w-[380px] bg-black/10 backdrop-blur-md rounded-lg shadow-lg flex flex-col p-4">
        
        {/* Tabs */}
        <div className="flex justify-between mt-3">
          <h6
            onClick={() => setIsLogin(true)}
            className={`text-xl font-bold p-2 rounded-xl ml-7 cursor-pointer transition
              ${isLogin ? "bg-blue-500 text-white" : "text-gray-200 hover:bg-blue-300"}`}
          >
            Login
          </h6>

          <h6
            onClick={() => setIsLogin(false)}
            className={`text-xl font-bold p-2 rounded-xl mr-7 cursor-pointer transition
              ${!isLogin ? "bg-blue-500 text-white" : "text-gray-200 hover:bg-blue-300"}`}
          >
            Register
          </h6>
        </div>

        {/* Render Form */}
        {isLogin ? <LoginForm /> : <RegisterForm />}

      </div>
    </div>
  )
}

export default Auth


